import React from "react";
export interface StepProps {
    step: number;
}

const Steps: React.FC<StepProps> = ({ step }) => {

    return (
        <ul className="steps steps-vertical lg:steps-horizontal">
            <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>Nom et email</li>
            <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>Date et heure</li>
            <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>Nombre de participants</li>
            <li className={`step ${step >= 4 ? 'step-primary' : ''}`}>Confirmation</li>
        </ul>
    );
}

export default Steps;