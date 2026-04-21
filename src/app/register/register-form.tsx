"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { register_user } from "@/actions/register";
import type { FormState } from "@/actions/register";

const initialState: FormState = { errors: {} };

export default function RegisterForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    register_user,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      router.push("/login");
    }
  }, [state.success, router]);

  const e = state.errors;

  return (
    <form action={formAction} className="space-y-5">
      {/* First name & Last name */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">
            First name <span className="text-red-500">*</span>
          </Label>
          <Input id="firstName" name="firstName" placeholder="John" required />
          {e.firstName && <p className="text-sm text-red-500">{e.firstName}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" name="lastName" placeholder="Doe" />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
        />
        {e.email && <p className="text-sm text-red-500">{e.email}</p>}
      </div>

      {/* Username */}
      <div className="space-y-1.5">
        <Label htmlFor="username">
          Username <span className="text-red-500">*</span>
        </Label>
        <Input id="username" name="username" placeholder="johndoe" required />
        {e.username && <p className="text-sm text-red-500">{e.username}</p>}
      </div>

      {/* Password & Confirm Password */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
          {e.password && <p className="text-sm text-red-500">{e.password}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">
            Confirm password <span className="text-red-500">*</span>
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
          />
          {e.confirmPassword && (
            <p className="text-sm text-red-500">{e.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label htmlFor="phone">
          Phone <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          required
        />
        {e.phone && <p className="text-sm text-red-500">{e.phone}</p>}
      </div>

      {/* Location */}
      <div className="space-y-1.5">
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" placeholder="New York, USA" />
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
        {pending ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
