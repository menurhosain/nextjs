"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { reset_password, type ResetPasswordFormState } from "@/actions/reset-password";

const initialState: ResetPasswordFormState = { errors: {} };

export default function ResetPasswordForm({ code }: { code: string }) {
  const [state, formAction, pending] = useActionState(reset_password, initialState);

  if (state.success) {
    return (
      <>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Password reset</h1>
        <p className="text-sm text-gray-500 mb-6">
          Your password has been updated. You can now sign in with your new password.
        </p>
        <a
          href="/login"
          className="block w-full text-center bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Go to login
        </a>
      </>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Set new password</h1>
      <p className="text-sm text-gray-500 mb-6">
        Enter and confirm your new password below.
      </p>

      <input type="hidden" name="code" value={code} />

      <div className="space-y-1.5">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />
        {state.errors.password && (
          <p className="text-sm text-red-500">{state.errors.password}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          required
        />
        {state.errors.confirmPassword && (
          <p className="text-sm text-red-500">{state.errors.confirmPassword}</p>
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
        {pending ? "Resetting..." : "Reset password"}
      </Button>
    </form>
  );
}
