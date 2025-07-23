"use client";
import {type ReactElement, useState} from "react";

export function useMultiStepForm(steps : ReactElement[]){

    const [currentStep, setCurrentStep] = useState(0);

    function next(){

        setCurrentStep( i =>
            i < steps.length - 1 ? i + 1 : i
        )
    }

    function previous(){
        setCurrentStep( i =>
            i > 0 ? i - 1 : i
        )
    }

    function goTo(step : number){
        if (step < 0 || step >= steps.length) return;
        setCurrentStep(step);
    }

    return{
        currentStep,
        step: steps[currentStep],
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === steps.length - 1,
        next,
        previous,
        goTo
    }
}