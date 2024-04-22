export const BASE_URL =
  process.env.VERCEL_ENV === "production" ||
  process.env.VERCEL_ENV === "preview"
    ? "https://cipher-forge.aryak.dev"
    : "http://localhost:3000";
