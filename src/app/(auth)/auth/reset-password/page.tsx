"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, Suspense } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { authClient } from "@/lib/auth-client";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  if (!token) {
    return (
      <AuthLayout title="Invalid link">
        <Alert variant="error">This password reset link is invalid or has expired.</Alert>
        <p className="mt-6 text-center text-sm text-[#57534E]">
          <Link href="/auth/forgot-password" className="font-medium text-[#14532D] hover:underline">
            Request a new link
          </Link>
        </p>
      </AuthLayout>
    );
  }

  const onSubmit = async (data: ResetPasswordInput) => {
    setServerError(null);
    const result = await authClient.resetPassword({
      newPassword: data.password,
      token,
    });
    if (result.error) {
      setServerError(result.error.message ?? "Failed to reset password.");
    } else {
      router.push("/auth/login?reset=success");
    }
  };

  return (
    <AuthLayout title="Reset your password" subtitle="Choose a new password for your account">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        {serverError && <Alert variant="error">{serverError}</Alert>}
        <Input
          label="New password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="••••••••"
          hint="At least 8 characters, one uppercase, one number"
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button type="submit" loading={isSubmitting} size="lg" className="w-full">
          Reset password
        </Button>
      </form>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}
