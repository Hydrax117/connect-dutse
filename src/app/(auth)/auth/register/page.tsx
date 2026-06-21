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
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";

export default function RegisterPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setServerError(null);
    const result = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });
    if (result.error) {
      setServerError(result.error.message ?? "Registration failed. Please try again.");
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <AuthLayout title="Check your email">
        <Alert variant="success">
          We sent a verification link to your email. Click it to activate your account and start
          using Connect Dutse.
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
      title="Create your account"
      subtitle="Join Connect Dutse and start buying or selling today"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        {serverError && <Alert variant="error">{serverError}</Alert>}

        <Input
          label="Full name"
          type="text"
          autoComplete="name"
          required
          placeholder="Aminu Musa"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Phone number"
          type="tel"
          autoComplete="tel"
          placeholder="08012345678"
          hint="Optional — for buyers to contact you"
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />

        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="••••••••"
          hint="At least 8 characters, one uppercase, one number"
          error={errors.password?.message}
          {...register("password")}
        />

        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" loading={isSubmitting} size="lg" className="mt-2 w-full">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[#57534E]">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-medium text-[#14532D] hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
