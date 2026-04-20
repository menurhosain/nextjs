import { headers } from "next/headers";
import { redirect } from "next/navigation";
import EditProfileForm from "./edit-form";

export default async function EditProfilePage() {
  const headersList = await headers();
  const raw = headersList.get("x-user");

  if (!raw) redirect("/login");

  const user = JSON.parse(raw) as Record<string, unknown>;

  const firstName = String(user.first_name ?? user.firstName ?? "");
  const lastName = String(user.last_name ?? user.lastName ?? "");
  const phone = String(user.phone ?? "");
  const location = String(user.location ?? "");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Update your personal information.</p>
        </div>
        <EditProfileForm
          defaultValues={{ firstName, lastName, phone, location }}
        />
      </div>
    </main>
  );
}
