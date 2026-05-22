import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import EditProfileForm from "./edit-form";
import { BASE_URL } from "@/lib/constant";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";

export const metadata: Metadata = { title: "Edit Profile" };

export default async function EditProfilePage() {
    const headersList = await headers();
    const raw = headersList.get("x-user");

    if (!raw) redirect("/login");

    const user = JSON.parse(raw) as Record<string, unknown>;

    const firstName = String(user.first_name ?? "");
    const lastName = String(user.last_name ?? "");
    const phone = String(user.phone ?? "");
    const location = String(user.location ?? "");
    const profilePicture = user.profile_picture as { url: string; formats?: { thumbnail?: { url: string } } } | null | undefined;
    const rawUrl = profilePicture?.formats?.thumbnail?.url ?? profilePicture?.url;
    const pictureUrl = rawUrl ? `${BASE_URL}${rawUrl}` : null;

    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="" title="Edit Profile" />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
                        <p className="text-sm text-gray-500 mt-1">Update your personal information.</p>
                    </div>
                    <EditProfileForm defaultValues={{ firstName, lastName, phone, location, pictureUrl }} />
                </div>
            </div>
        </>
    );
}
