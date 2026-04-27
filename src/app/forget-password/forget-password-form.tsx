"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    // TODO: wire up to backend reset endpoint
    await new Promise((r) => setTimeout(r, 500));
    setPending(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="text-sm text-center text-gray-600">
        If an account exists for <span className="font-medium">{email}</span>,
        you will receive a password reset email shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot password</h1>
      <p className="text-sm text-gray-500 mb-6">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="w-full mt-2 cursor-pointer"
        variant="secondary"
      >
        {pending ? "Sending..." : "Send reset link"}
      </Button>
    </form>
  );
}
