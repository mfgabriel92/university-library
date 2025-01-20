"use client";

import { AuthForm } from "@/components";
import { signUpSchema } from "@/lib/validations";

export default function SignUpPage() {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        name: "",
        email: "",
        universityCard: "",
        universityId: 0,
        password: "",
      }}
      onSubmit={() => {}}
    />
  );
}
