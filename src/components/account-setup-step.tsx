import Input from "./input";
import type { StepProps } from "../types";
import { Settings } from "lucide-react";

export default function AccountSetupStep({
  data,
  onChange,
  errors,
}: StepProps) {
  return (
    <form className="space-y-6">
      <hgroup className="text-center mb-8">
        <i className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="size-8 text-green-600" />
        </i>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Account Setup</h3>
        <p className="text-gray-600">
          Create your login credentials to secure your account.
        </p>
      </hgroup>

      <fieldset className="space-y-4">
        <Input
          id="username"
          label="Username"
          value={data.username}
          onChange={(value) => onChange("username", value)}
          placeholder="Choose a username"
          required
          error={errors.username}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          value={data.password}
          onChange={(value) => onChange("password", value)}
          placeholder="Create a secure password"
          required
          error={errors.password}
          helpText="Password must be at least 8 characters long"
        />
      </fieldset>
    </form>
  );
}
