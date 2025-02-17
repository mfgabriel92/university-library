"use server";

import { signIn } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { AuthCredentials } from "@/types";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">,
) {
  const { email, password } = params;

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
}

export async function signUp(params: AuthCredentials) {
  const { name, email, password, universityId, universityCard } = params;

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

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
