import React from 'react';

type StepIndicatorProps = {
  currentStep: number;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="text-center my-4">
      <p>Adım {currentStep} / 3</p>
    </div>
  );
};

export default StepIndicator;
