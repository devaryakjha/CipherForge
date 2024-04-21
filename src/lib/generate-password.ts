import type { FormSchemaPayload } from "./schema";

const generatePassword = (data: FormSchemaPayload) => {
  const { letters, numbers, punctuation, length, mixedCase } = data;
  const charset = [
    { enabled: letters && !mixedCase, chars: "abcdefghijklmnopqrstuvwxyz" },
    {
      enabled: letters && mixedCase,
      chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    },
    { enabled: numbers, chars: "0123456789" },
    { enabled: punctuation, chars: "!@#$%^&*()-_=+[]{}|;:,.<>?/" },
  ]
    .filter((item) => item.enabled)
    .map((item) => item.chars)
    .join("");

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
};

export default generatePassword;
