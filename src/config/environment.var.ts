import { z } from "zod";

const envSchema = z.object({
  // database
  DATABASE_URL: z.string().min(1),

  // TCP server
  TCP_PORT: z.coerce.number().int().min(1).max(65535),

  // HTTP server
  HTTP_PORT: z.coerce.number().int().min(1).max(65535),

  // JWT token
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().min(1),

  // emailer
  EMAILER_API_KEY: z.string().min(1),
  EMAILER_ADDRESS: z.string().email(),

  // rate limitation
  RATE_LIMIT: z.coerce.number().int().positive(),
});

export const env = envSchema.parse(process.env);
