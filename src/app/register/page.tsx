import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create an account</h1>

        <form className="space-y-5">
          {/* First name & Last name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">
                First name <span className="text-red-500">*</span>
              </Label>
              <Input id="firstName" placeholder="John" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <Label htmlFor="username">
              Username <span className="text-red-500">*</span>
            </Label>
            <Input id="username" placeholder="johndoe" required />
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">
                Confirm password <span className="text-red-500">*</span>
              </Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" required />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="New York, USA" />
          </div>

          <Button type="submit" className="w-full mt-2">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
