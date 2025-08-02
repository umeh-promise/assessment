import type { FormData, FormErrors, ValidationResult } from "../types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const validateStep = (
  step: number,
  formData: FormData
): ValidationResult => {
  const newErrors: FormErrors = {};

  switch (step) {
    case 1:
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      break;
    case 2:
      if (!formData.username.trim()) {
        newErrors.username = "Username is required";
      } else if (formData.username.length < 3) {
        newErrors.username = "Username must be at least 3 characters long";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
      }
      break;
    case 3:
      if (!formData.theme) {
        newErrors.theme = "Please select a theme preference";
      }
      break;
    default:
      break;
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors,
  };
};

export const isFormCompleted = (formData: FormData): boolean => {
  return !!(
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.username.trim() &&
    formData.password &&
    formData.theme
  );
};
