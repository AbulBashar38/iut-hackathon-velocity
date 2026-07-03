import {
  GoogleGenerativeAI,
  type GenerativeModel,
} from "@google/generative-ai";

import config from "../../../config/index.js";
import { logger } from "../../../core/utils/logger.js";
import { SYSTEM_INSTRUCTION, buildUserPrompt } from "./prompt.js";

const LLM_TIMEOUT_MS = 6000;

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
  Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("LLM request timed out")), ms),
    ),
  ]);

export interface LlmClient {
  readonly enabled: boolean;
  /** Returns a rephrased reply, or the base text on disable/error/timeout. */
  enhance(baseText: string): Promise<string>;
}

/**
 * Gemini-backed phrasing layer. Never the source of truth: on any failure it
 * returns the deterministic base text, so the bot always responds correctly.
 */
class GeminiClient implements LlmClient {
  private model: GenerativeModel | null = null;

  get enabled(): boolean {
    return Boolean(config.llm.geminiApiKey);
  }

  private getModel(): GenerativeModel {
    if (!this.model) {
      const genAI = new GoogleGenerativeAI(config.llm.geminiApiKey);
      this.model = genAI.getGenerativeModel({
        model: config.llm.model,
        systemInstruction: SYSTEM_INSTRUCTION,
      });
    }
    return this.model;
  }

  async enhance(baseText: string): Promise<string> {
    if (!this.enabled) return baseText;

    try {
      const result = await withTimeout(
        this.getModel().generateContent(buildUserPrompt(baseText)),
        LLM_TIMEOUT_MS,
      );
      const text = result.response.text().trim();
      return text.length > 0 ? text : baseText;
    } catch (error) {
      logger.warn("LLM enhancement failed; falling back to base text", error);
      return baseText;
    }
  }
}

export const llm: LlmClient = new GeminiClient();
