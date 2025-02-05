"use client";

import Link from "next/link";
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
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

export function AuthForm<T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormProps<T>) {
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  async function handleOnSubmit(data: T) {
    onSubmit(data);
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-2xl font-semibold text-white">
        {type === "SIGN_IN" ? "Sign In" : "Sign Up"}
      </h1>
      <p className="text-center text-light-100">
        {type === "SIGN_IN" ? "Sign-in to continue" : "Sign-up to get started"}
      </p>

      <Form {...form}>
        <form action={handleOnSubmit} className="flex flex-col gap-4">
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
                        type={fieldTypes[field.name as keyof typeof fieldTypes]}
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
            {type === "SIGN_IN" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {type === "SIGN_IN"
          ? "New to University Library? "
          : "I Already have an account "}
        <Link
          href={type === "SIGN_IN" ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {type === "SIGN_IN" ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </div>
  );
}
