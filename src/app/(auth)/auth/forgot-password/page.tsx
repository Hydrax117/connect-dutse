"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { authClient } from "@/lib/auth-client";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setServerError(null);
    const result = await authClient.requestPasswordReset({
      email: data.email,
      redirectTo: "/auth/reset-password",
    });
    if (result.error) {
      setServerError(result.error.message ?? "Something went wrong.");
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <AuthLayout title="Check your email">
        <Alert variant="success">
          If an account exists for that email, we sent a password reset link. Check your inbox.
        </Alert>
        <p className="mt-6 text-center text-sm text-[#57534E]">
          <Link href="/auth/login" className="font-medium text-[#14532D] hover:underline">
            Back to sign in
          </Link>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we will send you a reset link"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        {serverError && <Alert variant="error">{serverError}</Alert>}
        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Button type="submit" loading={isSubmitting} size="lg" className="w-full">
          Send reset link
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[#57534E]">
        <Link href="/auth/login" className="font-medium text-[#14532D] hover:underline">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
