import { headers } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function ProfilePage() {
  const headersList = await headers();
  const raw = headersList.get("x-user");

  if (!raw) redirect("/login");

  const user = JSON.parse(raw) as Record<string, unknown>;

  const username = user.username as string | undefined;
  const email = user.email as string | undefined;
  const firstName = user.first_name as string | undefined;
  const lastName = user.last_name as string | undefined;
  const phone = user.phone as string | undefined;
  const location = user.location as string | undefined;
  const type = user.type as string | undefined;
  const profilePicture = user.profile_picture as { url: string; formats?: { thumbnail?: { url: string } } } | null | undefined;
  const rawUrl = profilePicture?.formats?.thumbnail?.url ?? profilePicture?.url;
  const pictureUrl = rawUrl ? `${BASE_URL}${rawUrl}` : null;
  const initials = (firstName?.[0] ?? username?.[0] ?? "?").toUpperCase();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="flex items-center gap-4">
          {pictureUrl ? (
            <img
              src={pictureUrl}
              alt="Profile picture"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
              {initials}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {firstName && lastName ? `${firstName} ${lastName}` : (username ?? "My Profile")}
            </h1>
            {type && (
              <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
                {type}
              </span>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {email && (
            <div className="py-3 flex justify-between text-sm">
              <span className="text-gray-500">Email</span>
              <span className="text-gray-900 font-medium">{email}</span>
            </div>
          )}
          {username && (
            <div className="py-3 flex justify-between text-sm">
              <span className="text-gray-500">Username</span>
              <span className="text-gray-900 font-medium">{username}</span>
            </div>
          )}
          {phone && (
            <div className="py-3 flex justify-between text-sm">
              <span className="text-gray-500">Phone</span>
              <span className="text-gray-900 font-medium">{phone}</span>
            </div>
          )}
          {location && (
            <div className="py-3 flex justify-between text-sm">
              <span className="text-gray-500">Location</span>
              <span className="text-gray-900 font-medium">{location}</span>
            </div>
          )}
        </div>

        <a
          href="/profile/edit"
          className="block w-full text-center text-sm font-medium bg-gray-900 text-white rounded-lg py-2.5 hover:bg-gray-700 transition-colors"
        >
          Edit Profile
        </a>
      </div>
    </main>
  );
}
