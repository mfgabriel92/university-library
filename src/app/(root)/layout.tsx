import { PropsWithChildren } from "react";
import { Header } from "@/components";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className="root-container">
      <Header />
      <div className="mt-20 pb-20">{children}</div>
    </main>
  );
}
