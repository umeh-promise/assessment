export interface StepProps {
  data: FormData;
  onChange: (field: keyof FormData, value: string | boolean) => void;
  errors: FormErrors;
}

export type FormErrors = Partial<{
  fullName: string;
  email: string;
  username: string;
  password: string;
  theme: string;
}>;

export interface FormData {
  fullName: string;
  email: string;
  username: string;
  password: string;
  theme: string;
  newsletter: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}
