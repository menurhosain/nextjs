"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login_user } from "@/actions/login";
import type { LoginFormState } from "@/actions/login";

const initialState: LoginFormState = { errors: {} };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    login_user,
    initialState,
  );

  const e = state.errors;

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="email" className="font-normal text-sah-gray-1 mb-[12px]">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          className="h-[56px] rounded-[6px] border-sah-gray-4 text-sah-gray-1  focus-visible:border-sah-red focus:outline-none focus-visible:ring-0"
        />
        {e.email && <p className="text-sm text-red-500">{e.email}</p>}
      </div>

      <div className="space-y-1.5">
        <div className="flex sm:items-center justify-between flex-col sm:flex-row">
          <Label htmlFor="password" className="font-normal text-sah-gray-1 mb-[12px]">Password</Label>
          <a href="/forget-password" className="text-xs text-gray-500 hover:underline">
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="h-[56px] rounded-[6px] border-sah-gray-4 text-sah-gray-1  focus-visible:border-sah-red focus:outline-none focus-visible:ring-0"
        />
        {e.password && <p className="text-sm text-red-500">{e.password}</p>}
      </div>

      {state.serverError && (
        <p className="text-sm text-red-500 text-center">{state.serverError}</p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="w-full mt-2 cursor-pointer bg-sah-black text-sah-white py-5 rounded-[6px] hover:bg-sah-red"
        variant="secondary"
      >
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
