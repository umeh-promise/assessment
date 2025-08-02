import { Check } from "lucide-react";
import type { FormData } from "../types";

interface CompletionSummaryProps {
  formData: FormData;
  onReset: () => void;
}

export default function CompletionSummary({
  formData,
  onReset,
}: CompletionSummaryProps) {
  const summaryItems = [
    { label: "Name", value: formData.fullName },
    { label: "Email", value: formData.email },
    { label: "Username", value: formData.username },
    { label: "Theme", value: formData.theme },
    { label: "Newsletter", value: formData.newsletter ? "Yes" : "No" },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
      <hgroup className="text-center mb-6">
        <i className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="size-8 text-green-600" />
        </i>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          ✅ Onboarding Completed!
        </h3>
        <p className="text-gray-600">Here's a summary of your information:</p>
      </hgroup>

      <ul className="space-y-3 mb-6">
        {summaryItems.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="font-medium text-gray-700">{item.label}:</span>
            <p className="text-gray-900">{item.value}</p>
          </li>
        ))}
      </ul>

      <button
        onClick={onReset}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
      >
        Start New Onboarding
      </button>
    </section>
  );
}
