export const BASE_URL =
  process.env.VERCEL_ENV === "production"
    ? "https://aryak.dev"
    : process.env.VERCEL_ENV === "preview"
    ? `https://dev.aryak.dev`
    : "http://localhost:3000";
