"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { forget_password, type ForgetPasswordFormState } from "@/actions/forget-password";

const initialState: ForgetPasswordFormState = { errors: {} };

export default function ForgetPasswordForm() {
  const [state, formAction, pending] = useActionState(forget_password, initialState);

  if (state.success) {
    return (
      <>
        <h1 className="text-2xl text-center font-bold text-gray-900 mb-2">Check your email</h1>
        <p className="text-sm text-gray-500 text-center">
          If an account exists for{" "}
          <span className="font-medium text-gray-700">{state.email}</span>, you
          will receive a password reset link shortly.
        </p>
      </>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
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
          required
        />
        {state.errors.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
      </div>

      {state.serverError && (
        <p className="text-sm text-red-500 text-center">{state.serverError}</p>
      )}

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
