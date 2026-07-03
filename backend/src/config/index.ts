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

  discord: {
    /** Bot token. When empty, the Discord bot is disabled. */
    botToken: process.env.DISCORD_BOT_TOKEN ?? "",
    commandPrefix: process.env.DISCORD_COMMAND_PREFIX ?? "!",
  },

  llm: {
    /** Gemini API key. When empty, the bot falls back to deterministic text. */
    geminiApiKey: process.env.GEMINI_API_KEY ?? "",
    model: process.env.LLM_MODEL ?? "gemini-1.5-flash",
  },
};

export default config;
