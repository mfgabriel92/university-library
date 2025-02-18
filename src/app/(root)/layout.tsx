import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Header } from "@/components";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="root-container">
      <Header session={session} />
      <div className="mt-20 pb-20">{children}</div>
    </main>
  );
};

export default MainLayout;
