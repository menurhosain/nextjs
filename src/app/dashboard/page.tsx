import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { get_user_applications } from "@/services/applicant.service";

export default async function DashboardPage() {
  const headersList = await headers();
  const raw = headersList.get("x-user");

  if (!raw) redirect("/login");

  const user = JSON.parse(raw) as Record<string, unknown>;

  const userId = user.id as number;
  const firstName = user.first_name as string | undefined;
  const username = user.username as string | undefined;
  const email = user.email as string | undefined;
  const type = user.type as string | undefined;
  const displayName = firstName ?? username ?? "there";

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")!.value;

  const applications = await get_user_applications(userId, jwt);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {displayName}!</h2>
          <p className="text-sm text-gray-500 mt-1">Here's a summary of your account.</p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/profile"
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Profile</p>
            <p className="mt-2 text-base font-semibold text-gray-900">View & edit your info</p>
            <p className="text-sm text-gray-500 mt-1">Name, phone, location, profile picture</p>
          </a>

          <a
            href="/apply-for-recrutement"
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Recruitment</p>
            <p className="mt-2 text-base font-semibold text-gray-900">Apply for a position</p>
            <p className="text-sm text-gray-500 mt-1">Submit your CV and skills</p>
          </a>
        </div>

        {/* Account details */}
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

        {/* Applications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">My Applications</h3>
            <a href="/apply-for-recrutement" className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-2">
              + New application
            </a>
          </div>

          {applications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <p className="text-sm text-gray-500">You haven't submitted any applications yet.</p>
              <a
                href="/apply-for-recrutement"
                className="inline-block mt-3 text-sm font-medium text-gray-900 underline underline-offset-2"
              >
                Submit your first application
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {app.firstName} {app.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{app.email}</p>
                    {app.skills && (
                      <p className="text-xs text-gray-400">Skills: {app.skills}</p>
                    )}
                    {app.location && (
                      <p className="text-xs text-gray-400">Location: {app.location}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                    {app.label && (
                      <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
                        {app.label}
                      </span>
                    )}
                    <p className="text-xs text-gray-400">
                      {new Date(app.appliedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
