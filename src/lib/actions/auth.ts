"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { AuthCredentials } from "@/types";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import config from "@/lib/config";
import rateLimit from "@/lib/rateLimit";
import { workflowClient } from "@/lib/workflow";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params;

  await checkLimits();

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        error: result.error,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { name, email, password, universityId, universityCard } = params;

  await checkLimits();

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length) {
    return {
      success: false,
      error: "This user already exists",
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    });

    await signInWithCredentials({ email, password });
    await workflowClient.trigger({
      url: `${config.env.apiEndpoint}/api/workflows/onboarding`,
      body: {
        name,
        email,
      },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const checkLimits = async () => {
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await rateLimit.limit(ip);

  if (!success) {
    return redirect("/woah");
  }
};
