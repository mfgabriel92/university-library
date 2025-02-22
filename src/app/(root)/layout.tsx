import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { auth } from "@/auth";
import { Header } from "@/components";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  after(async () => {
    if (!session?.user?.id) {
      return;
    }

    const newActivityAt = new Date().toISOString().split("T")[0];

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id));

    if (user[0].lastActivityAt !== newActivityAt) {
      await db
        .update(users)
        .set({ lastActivityAt: newActivityAt })
        .where(eq(users.id, session.user.id));
    }
  });

  return (
    <main className="root-container">
      <Header session={session} />
      <div className="mt-20 pb-20">{children}</div>
    </main>
  );
};

export default MainLayout;
