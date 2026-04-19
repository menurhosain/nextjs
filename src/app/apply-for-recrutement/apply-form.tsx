"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submit_apply } from "@/actions/apply";
import type { ApplyFormState } from "@/actions/apply";

const initialState: ApplyFormState = { errors: {} };

export default function ApplyForm() {
  const [state, formAction, pending] = useActionState(
    submit_apply,
    initialState,
  );

  const e = state.errors;

  return (
    <form action={formAction} className="space-y-5">
      {/* First name & Last name */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">
            First name <span className="text-red-500">*</span>
          </Label>
          <Input id="firstName" name="firstName" placeholder="John" />
          {e.firstName && <p className="text-sm text-red-500">{e.firstName}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">
            Last name <span className="text-red-500">*</span>
          </Label>
          <Input id="lastName" name="lastName" placeholder="Doe" />
          {e.lastName && <p className="text-sm text-red-500">{e.lastName}</p>}
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
        />
        {e.email && <p className="text-sm text-red-500">{e.email}</p>}
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      {/* CV File */}
      <div className="space-y-1.5">
        <Label htmlFor="cvFile">
          CV / Resume <span className="text-red-500">*</span>
        </Label>
        <Input
          id="cvFile"
          name="cvFile"
          type="file"
          accept=".pdf,.doc,.docx,image/*"
          className="cursor-pointer"
        />
        {e.cvFile && <p className="text-sm text-red-500">{e.cvFile}</p>}
      </div>

      {/* Skills */}
      <div className="space-y-1.5">
        <Label htmlFor="skills">Skills</Label>
        <textarea
          id="skills"
          name="skills"
          placeholder="e.g. React, Node.js, SQL..."
          rows={3}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
        />
      </div>

      {/* Experience Years & Location */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="experienceYears">Years of experience</Label>
          <Input
            id="experienceYears"
            name="experienceYears"
            type="number"
            min={0}
            max={50}
            placeholder="3"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" placeholder="New York, USA" />
        </div>
      </div>

      {state.serverError && (
        <p className="text-sm text-red-500 text-center">{state.serverError}</p>
      )}

      {state.success && (
        <p className="text-sm text-green-600 text-center">
          Application submitted successfully!
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="w-full mt-2 cursor-pointer"
        variant="secondary"
      >
        {pending ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
