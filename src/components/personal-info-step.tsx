import Input from "./input";
import type { StepProps } from "../types";
import { User } from "lucide-react";

export default function PersonalInfoStep({
  data,
  onChange,
  errors,
}: StepProps) {
  return (
    <form className="space-y-6">
      <hgroup className="text-center mb-8">
        <i className="size-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="size-8 text-blue-600" />
        </i>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Personal Information
        </h3>
        <p className="text-gray-600">
          Let's start with some basic information about you.
        </p>
      </hgroup>

      <fieldset className="space-y-4">
        <Input
          id="fullName"
          label="Full Name"
          value={data.fullName}
          onChange={(value) => onChange("fullName", value)}
          placeholder="Enter your full name"
          required
          error={errors.fullName}
        />

        <Input
          id="email"
          label="Email Address"
          type="email"
          value={data.email}
          onChange={(value) => onChange("email", value)}
          placeholder="Enter your email address"
          required
          error={errors.email}
        />
      </fieldset>
    </form>
  );
}
