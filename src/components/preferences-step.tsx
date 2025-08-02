import Select from "./select";
import type { StepProps } from "../types";
import { Heart } from "lucide-react";

export default function PreferencesStep({ data, onChange, errors }: StepProps) {
  return (
    <form className="space-y-6">
      <hgroup className="text-center mb-8">
        <i className="size-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="size-8 text-purple-600" />
        </i>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Preferences</h3>
        <p className="text-gray-600">
          Customize your experience to suit your preferences.
        </p>
      </hgroup>

      <fieldset className="space-y-6">
        <Select
          id="theme"
          label="Theme Preference"
          value={data.theme}
          onChange={(value) => onChange("theme", value)}
          options={[
            { value: "Light", label: "Light" },
            { value: "Dark", label: "Dark" },
          ]}
          placeholder="Select a theme"
          required
          error={errors.theme}
        />

        <div className="flex items-start space-x-3" role="group">
          <input
            type="checkbox"
            id="newsletter"
            checked={data.newsletter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange("newsletter", e.target.checked)
            }
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="flex-1">
            <label
              htmlFor="newsletter"
              className="text-sm font-medium text-gray-700"
            >
              Subscribe to newsletter
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Get the latest updates, tips, and exclusive content delivered to
              your inbox.
            </p>
          </span>
        </div>
      </fieldset>
    </form>
  );
}
