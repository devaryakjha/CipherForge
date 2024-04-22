import type { FormSchemaPayload } from "./schema";

type SwitchField = {
  name: "letters" | "mixedCase" | "numbers" | "punctuation";
  label: string;
  description: string;
  "aria-label": string;
  disabled?: boolean;
};

export const switchFields = (form: FormSchemaPayload) =>
  [
    {
      name: "letters",
      label: "Letters",
      description: "Include letters (only lowercase)",
      "aria-label": "Include letters",
    },
    {
      name: "mixedCase",
      label: "Mixed case",
      description: "Include both lowercase and uppercase letters",
      "aria-label": "Include mixed case",
      disabled: !form.letters,
    },
    {
      name: "numbers",
      label: "Numbers",
      description: "Include numbers",
      "aria-label": "Include numbers",
    },
    {
      name: "punctuation",
      label: "Punctuation",
      description: "Include punctuation",
      "aria-label": "Include punctuation",
    },
  ] as SwitchField[];
