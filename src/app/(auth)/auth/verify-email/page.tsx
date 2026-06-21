"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [resent, setResent] = useState(false);
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    setResending(true);
    await authClient.sendVerificationEmail({ email: "" });
    setResent(true);
    setResending(false);
  };

  if (error) {
    return (
      <AuthLayout title="Verification failed">
        <Alert variant="error">This verification link is invalid or has expired.</Alert>
        <Button
          variant="secondary"
          className="mt-4 w-full"
          loading={resending}
          onClick={handleResend}
        >
          Send a new link
        </Button>
        {resent && (
          <Alert variant="success" title="Sent">
            Check your inbox for a new verification link.
          </Alert>
        )}
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Verify your email">
      <Alert variant="info">
        We sent a verification link to your email address. Click the link to activate your account.
      </Alert>
      <p className="mt-6 text-center text-sm text-[#57534E]">
        <Link href="/auth/login" className="font-medium text-[#14532D] hover:underline">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
