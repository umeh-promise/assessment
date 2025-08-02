import { Fragment, useState } from "react";
import Modal from "./modal";
import PersonalInfoStep from "./personal-info-step";
import AccountSetupStep from "./account-setup-step";
import PreferencesStep from "./preferences-step";
import { Check, ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import type { FormData, FormErrors, StepProps } from "../types";
import { cn, isFormCompleted, validateStep } from "../utils";
import CompletionSummary from "./completion-summary";

interface Step {
  number: number;
  title: string;
  component: React.ComponentType<StepProps>;
}

export default function OnboardingModal() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    username: "",
    password: "",
    theme: "",
    newsletter: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const steps: Step[] = [
    { number: 1, title: "Personal Info", component: PersonalInfoStep },
    { number: 2, title: "Account Setup", component: AccountSetupStep },
    { number: 3, title: "Preferences", component: PreferencesStep },
  ];

  const completed = isFormCompleted(formData);

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleValidation = (step: number): boolean => {
    const validationResult = validateStep(step, formData);
    setErrors(validationResult.errors);
    return validationResult.isValid;
  };

  const handleNext = (): void => {
    if (handleValidation(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = (): void => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (): void => {
    if (handleValidation(currentStep)) {
      console.log("Form submitted:", formData);
      setIsOpen(false);
    }
  };

  const handleReset = (): void => {
    setFormData({
      fullName: "",
      email: "",
      username: "",
      password: "",
      theme: "",
      newsletter: false,
    });
    setCurrentStep(1);
    setErrors({});
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <hgroup className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Multi-Step Onboarding Form
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Experience a smooth, validated onboarding process with tabbed
          navigation and real-time feedback.
        </p>
      </hgroup>
      {!completed ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
        >
          Start Onboarding
        </button>
      ) : (
        <CompletionSummary formData={formData} onReset={handleReset} />
      )}

      <Modal isOpen={isOpen}>
        <hgroup className="bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between mb-4" role="group">
            <h2 className="text-4xl font-semibold text-gray-900">
              Get Started
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <XIcon />
            </button>
          </div>

          <div className="flex items-center justify-between" role="group">
            {steps.map((step, index) => (
              <Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "size-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 bg-gray-200 text-gray-500",
                      {
                        "bg-green-500 text-white": step.number < currentStep,
                        "bg-blue-500 text-white": step.number === currentStep,
                      }
                    )}
                  >
                    {step.number < currentStep ? (
                      <Check className="size-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs mt-1 transition-colors text-gray-500",
                      {
                        "text-blue-600 font-medium":
                          step.number === currentStep,
                      }
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <span
                    className={cn(
                      "flex-1 h-0.5 mx-2 transition-colors bg-gray-200",
                      {
                        "bg-green-500": step.number < currentStep,
                      }
                    )}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </hgroup>

        <div className="px-6 py-2 overflow-y-auto transform transition-all duration-300 ease-in-out text-black ">
          <CurrentStepComponent
            data={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        </div>

        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between text-white ">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors text-white hover:text-white hover:bg-gray-100",
              {
                "text-gray-400 hover:text-gray-400 cursor-not-allowed":
                  currentStep === 1,
              }
            )}
          >
            <ChevronLeft className="size-4" />
            <span>Back</span>
          </button>

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="size-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <span>Complete</span>
              <Check className="size-4" />
            </button>
          )}
        </div>
      </Modal>
    </section>
  );
}
