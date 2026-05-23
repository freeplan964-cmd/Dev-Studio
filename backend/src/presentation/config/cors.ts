import cors from "cors";

const isProd = process.env.NODE_ENV === "production";

const replitDomain = process.env.REPLIT_DEV_DOMAIN
  ? `https://${process.env.REPLIT_DEV_DOMAIN}`
  : null;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  "http://127.0.0.1:5173",
  "https://dev-studio77.netlify.app",
  process.env.FRONTEND_URL,
  replitDomain,
].filter(Boolean) as string[];

export const corsOptions = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      !isProd ||
      (origin && origin.endsWith(".replit.dev"))
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
});
