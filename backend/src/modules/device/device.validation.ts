import { z } from "zod";

export const deviceIdParamSchema = z.object({
  id: z.string().min(1, "Device id is required"),
});
