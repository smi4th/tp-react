import React from "react";
export interface StepProps {
    step: number;
}

const Steps: React.FC<StepProps> = ({ step }) => {

    return (
        <ul className="steps steps-vertical lg:steps-horizontal">
            <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>Name & Email</li>
            <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>Date & Time</li>
            <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>Number of Guests</li>
            <li className={`step ${step >= 4 ? 'step-primary' : ''}`}>Confirmation</li>
        </ul>
    );
}

export default Steps;