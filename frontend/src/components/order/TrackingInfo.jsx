import React from 'react';
import { IoOpenOutline } from 'react-icons/io5';
import Button from '@components/common/Button';

const TrackingInfo = ({ trackingNumber, shippingCarrier }) => {
  const getTrackingUrl = () => {
    const carriers = {
      UPS: `https://www.ups.com/track?tracknum=${trackingNumber}`,
      FedEx: `https://www.fedex.com/fedextrack/?tracknumbers=${trackingNumber}`,
      USPS: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`,
      DHL: `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`,
    };

    return carriers[shippingCarrier] || '#';
  };

  if (!trackingNumber) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <p className="text-gray-600">
          Tracking information will be available once your order ships
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-gold rounded-xl p-6 text-white">
      <h3 className="text-lg font-display font-bold mb-4">
        Tracking Information
      </h3>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm opacity-90 mb-1">Carrier</p>
          <p className="text-xl font-bold">{shippingCarrier}</p>
        </div>

        <div>
          <p className="text-sm opacity-90 mb-1">Tracking Number</p>
          <p className="text-lg font-mono">{trackingNumber}</p>
        </div>

        <a
          href={getTrackingUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button
            variant="secondary"
            fullWidth
            className="!bg-white !text-yellow-600 hover:!bg-gray-100"
            icon={<IoOpenOutline />}
          >
            Track Shipment
          </Button>
        </a>
      </div>
    </div>
  );
};

export default TrackingInfo;