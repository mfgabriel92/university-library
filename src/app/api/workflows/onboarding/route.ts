import { db } from "@/db";
import { users } from "@/db/schema";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/workflow";

type InitialData = {
  name: string;
  email: string;
};

const ONE_DAY = 60 * 60 * 24;
const THREE_DAYS = ONE_DAY * 3;
const ONE_MONTH = ONE_DAY * 30;

export const { POST } = serve<InitialData>(async (context) => {
  const { email, name } = context.requestPayload;

  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to Univsersity Library",
      message: `Welcome to University Library, ${name}`,
    });
  });

  await context.sleep("wait-for-3-days", THREE_DAYS);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await sendEmail({
        email,
        subject: "We miss you!",
        message: `Are you still there, ${name}?`,
      });
    } else if (state === "active") {
      await sendEmail({
        email,
        subject: "Welcome back!",
        message: `Welcome back, ${name}! We missed you.`,
      });
    }

    await context.sleep("wait-for-30-days", ONE_MONTH);
  }
});

const getUserState = async (
  email: string,
): Promise<"non-active" | "active"> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) {
    return "non-active";
  }

  const lastActivityAt = new Date(user[0].lastActivityAt!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityAt.getTime();

  if (timeDifference > THREE_DAYS && timeDifference <= ONE_MONTH) {
    return "non-active";
  }

  return "active";
};
