"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ApplyForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const documents = formData
      .getAll("documents")
      .filter(
        (value): value is File => value instanceof File && value.size > 0,
      );

    const values = {
      companyName: formData.get("companyName")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      phone: formData.get("phone")?.toString() ?? "",
      experienceYears: formData.get("experienceYears")?.toString() ?? "",
      location: formData.get("location")?.toString() ?? "",
      appliedAt: new Date().toISOString(),
      documents,
    };

    console.log("Contractor application values:", values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
          />
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
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="Dhaka, Bangladesh"
          />
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
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer"
        variant="secondary"
      >
        Submit Application
      </Button>
    </form>
  );
}
