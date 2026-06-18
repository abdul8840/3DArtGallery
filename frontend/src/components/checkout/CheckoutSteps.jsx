import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

const CheckoutSteps = ({ currentStep = 1 }) => {
  const steps = [
    { number: 1, title: 'Shipping' },
    { number: 2, title: 'Payment' },
    { number: 3, title: 'Review' },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            {/* Step */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentStep > step.number
                    ? 'bg-green-500 text-white'
                    : currentStep === step.number
                    ? 'bg-gradient-gold text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > step.number ? (
                  <IoCheckmarkCircle className="w-6 h-6" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 -mt-8">
                <div
                  className={`h-full rounded transition-all ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;