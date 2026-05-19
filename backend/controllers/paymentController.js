import Stripe from 'stripe';
import Order from '../models/Order.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create payment intent
// @route   POST /api/payment/create-intent
// @access  Private
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    // Validate order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderId: orderId,
        userId: req.user._id.toString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Save payment intent ID to order
    order.stripePaymentIntentId = paymentIntent.id;
    await order.save();

    res.status(200).json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment intent creation failed',
      error: error.message,
    });
  }
};

// @desc    Confirm payment
// @route   POST /api/payment/confirm
// @access  Private
export const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      order.isPaid = true;
      order.paidAt = Date.now();
      order.orderStatus = 'processing';
      order.paymentResult = {
        id: paymentIntent.id,
        status: paymentIntent.status,
        update_time: new Date().toISOString(),
      };

      order.statusHistory.push({
        status: 'processing',
        note: 'Payment confirmed via Stripe',
      });

      await order.save();

      res.status(200).json({
        success: true,
        data: order,
        message: 'Payment confirmed successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment not successful',
      });
    }
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment confirmation failed',
      error: error.message,
    });
  }
};

// @desc    Stripe webhook
// @route   POST /api/payment/webhook
// @access  Public
export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful:', paymentIntent.id);

      // Update order
      const order = await Order.findOne({
        stripePaymentIntentId: paymentIntent.id,
      });

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.orderStatus = 'processing';
        order.statusHistory.push({
          status: 'processing',
          note: 'Payment confirmed via webhook',
        });
        await order.save();
      }
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('PaymentIntent failed:', failedPayment.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

// @desc    Get Stripe publishable key
// @route   GET /api/payment/config
// @access  Public
export const getStripeConfig = async (req, res) => {
  res.status(200).json({
    success: true,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
};