"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { update_profile } from "@/actions/update-profile";
import type { UpdateProfileFormState } from "@/actions/update-profile";

type Props = {
  defaultValues: {
    firstName: string;
    lastName: string;
    phone: string;
    location: string;
  };
};

const initialState: UpdateProfileFormState = { errors: {} };

export default function EditProfileForm({ defaultValues }: Props) {
  const [state, formAction, pending] = useActionState(
    update_profile,
    initialState,
  );
  const e = state.errors;

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">
            First name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            defaultValue={defaultValues.firstName}
            placeholder="John"
          />
          {e.firstName && <p className="text-sm text-red-500">{e.firstName}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">
            Last name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            name="lastName"
            defaultValue={defaultValues.lastName}
            placeholder="Doe"
          />
          {e.lastName && <p className="text-sm text-red-500">{e.lastName}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          defaultValue={defaultValues.phone}
          placeholder="+1 234 567 890"
        />
        {e.phone && <p className="text-sm text-red-500">{e.phone}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          defaultValue={defaultValues.location}
          placeholder="New York, USA"
        />
        {e.location && <p className="text-sm text-red-500">{e.location}</p>}
      </div>

      {state.serverError && (
        <p className="text-sm text-red-500 text-center">{state.serverError}</p>
      )}

      <div className="flex gap-3 pt-1">
        <Button
          type="submit"
          disabled={pending}
          className="flex-1 cursor-pointer"
        >
          {pending ? "Saving..." : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="flex-1 cursor-pointer"
          onClick={() => history.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
