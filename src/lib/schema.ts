import type { ActionError } from "astro:actions";
import { z } from "astro/zod";

export type Message = ActionError["code"] | "SUCCESS";

export const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(1),
  password: z.string().min(8),
  repassword: z.string().min(8),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
