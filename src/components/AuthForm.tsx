"use client";

import { HTMLInputTypeAttribute } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fieldNames, fieldTypes } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadFileInput } from "@/components/UploadFileInput";

interface AuthFormProps<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (
    data: T,
  ) => Promise<{ success: boolean; error?: string | unknown }>;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormProps<T>) => {
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";

  const handleOnSubmit = async (data: T) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: "Success",
        description: `You have successfully signed ${isSignIn ? "in" : "out"}`,
      });

      return router.push("/");
    }

    toast({
      title: `Error signing ${isSignIn ? "in" : "out"}`,
      description: String(result?.error ?? "An error occurred"),
      variant: "destructive",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-2xl font-semibold text-white">
        {isSignIn ? "Sign In" : "Sign Up"}
      </h1>
      <p className="text-light-100 text-center">
        {isSignIn ? "Sign-in to continue" : "Sign-up to get started"}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="flex flex-col gap-4"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {fieldNames[field.name as keyof typeof fieldNames]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <UploadFileInput onFileChange={field.onChange} />
                    ) : (
                      <Input
                        {...field}
                        type={
                          fieldTypes[
                            field.name as keyof typeof fieldTypes
                          ] as HTMLInputTypeAttribute
                        }
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="mt-4 self-center text-black">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn
          ? "New to University Library? "
          : "I Already have an account "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="text-primary font-bold"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </div>
  );
};

export { AuthForm };
