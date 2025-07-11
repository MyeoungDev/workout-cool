import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

/**
 * This is the schema for the environment variables.
 *
 * Please import **this** file and use the `env` variable
 */
export const env = createEnv({
  server: {
    BETTER_AUTH_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    NODE_ENV: z.enum(["development", "production", "test"]),
    BETTER_AUTH_SECRET: z.string().min(1),
    OPENPANEL_SECRET_KEY: z.string().optional(),
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.coerce.number().positive().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    SMTP_FROM: z.string().optional(),
    //issue fixed in zod 4. See https://github.com/colinhacks/zod/issues/3906
    SMTP_SECURE: z
      .enum(["true", "false"])
      .default("false")
      .transform((val) => val === "true"),

    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
  },
  /**
   * If you add `client` environment variables, you need to add them to
   * `experimental__runtimeEnv` as well.
   */
  client: {
    NEXT_PUBLIC_OPENPANEL_CLIENT_ID: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_STRIPE_PRICE_MONTHLY: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PRICE_YEARLY: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_OPENPANEL_CLIENT_ID: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_STRIPE_PRICE_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY,
    NEXT_PUBLIC_STRIPE_PRICE_YEARLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY,
  },
});
