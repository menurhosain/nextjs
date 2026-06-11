import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const headersList = await headers();
  const raw = headersList.get("x-user");

  if (!raw) redirect("/login");

  const user = JSON.parse(raw) as Record<string, unknown>;

  const firstName = user.first_name as string | undefined;
  const username = user.username as string | undefined;
  const email = user.email as string | undefined;
  const type = user.type as string | undefined;
  const displayName = firstName ?? username ?? "there";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {displayName}!</h2>
          <p className="text-sm text-gray-500 mt-1">Here's a summary of your account.</p>
        </div>

        <a
          href="/profile"
          className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
        >
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Profile</p>
          <p className="mt-2 text-base font-semibold text-gray-900">View & edit your info</p>
          <p className="text-sm text-gray-500 mt-1">Name, phone, location, profile picture</p>
        </a>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">Account details</h3>
          <div className="divide-y divide-gray-100 text-sm">
            {email && (
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium text-gray-900">{email}</span>
              </div>
            )}
            {username && (
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">Username</span>
                <span className="font-medium text-gray-900">{username}</span>
              </div>
            )}
            {type && (
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-500">Account type</span>
                <span className="font-medium text-gray-900 capitalize">{type}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
