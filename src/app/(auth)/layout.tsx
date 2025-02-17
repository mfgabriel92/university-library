import { PropsWithChildren } from "react";
import Image from "next/image";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex items-center justify-center gap-4">
            <Image src="/logo.png" width={60} height={80} alt="Logo" />
            <h1 className="text-2xl font-semibold text-white">
              University Library
            </h1>
          </div>

          <div>{children}</div>
        </div>
      </section>

      <section className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          height={1000}
          width={1000}
          alt="illustration"
          className="size-full object-cover"
        />
      </section>
    </main>
  );
};

export default AuthLayout;
