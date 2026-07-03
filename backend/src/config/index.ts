import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 6006),
  /** Allowed CORS / Socket.io origin (the frontend dev server). */
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
};

export default config;
