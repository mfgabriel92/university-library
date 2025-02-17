"use client";

import { AuthForm } from "@/components";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";

const SignUpPage = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        name: "",
        email: "",
        password: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
};

export default SignUpPage;
