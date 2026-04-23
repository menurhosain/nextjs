"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  submit_contractor_apply,
  type ApplyContractorFormState,
} from "@/actions/apply-contractor";

const initialState: ApplyContractorFormState = { errors: {} };

export default function ApplyForm() {
  const [state, formAction, pending] = useActionState(
    submit_contractor_apply,
    initialState,
  );

  const e = state.errors;

  if (state.success) {
    return (
      <p className="text-center text-sm text-green-600 font-medium">
        Application submitted successfully!
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="companyName">
          Company name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="companyName"
          name="companyName"
          placeholder="Acme Contractors Ltd."
          required
        />
        {e.companyName && (
          <p className="text-sm text-red-500">{e.companyName}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="contact@acme.com"
            required
          />
          {e.email && <p className="text-sm text-red-500">{e.email}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
          />
          {e.phone && <p className="text-sm text-red-500">{e.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="experienceYears">Years of experience</Label>
          <Input
            id="experienceYears"
            name="experienceYears"
            type="number"
            min={0}
            max={100}
            placeholder="5"
          />
          {e.experienceYears && (
            <p className="text-sm text-red-500">{e.experienceYears}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="Dhaka, Bangladesh"
          />
          {e.location && <p className="text-sm text-red-500">{e.location}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="documents">Documents</Label>
        <Input
          id="documents"
          name="documents"
          type="file"
          accept=".pdf,.doc,.docx,image/*"
          multiple
          className="cursor-pointer"
        />
        <p className="text-sm text-muted-foreground">
          Upload company profile, certifications, or previous work samples.
        </p>
        {e.documents && (
          <p className="text-sm text-red-500">{e.documents}</p>
        )}
      </div>

      {state.serverError && (
        <p className="text-sm text-red-500 text-center">{state.serverError}</p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="w-full cursor-pointer"
        variant="secondary"
      >
        {pending ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
