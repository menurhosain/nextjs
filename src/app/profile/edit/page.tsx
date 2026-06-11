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
            <Banner bg="/home-hero.mp4">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="" title="Edit Profile" />
                    </div>
                </Left>

                <Right>
                    <div></div>
                </Right>
            </Banner>

            <section className="section-padding bg-sah-light-4">
                <div className="container !px-[50px] max-[1024px]:!px-4 pt-[80px] lg:pt-[150px] pb-[80px] lg:pb-[150px] border-x border-sah-light-3">
                    <div className="w-full bg-white lg:max-w-[750px] max-[640px]:px-4 p-10 flex flex-col rounded-[6px] overflow-hidden mx-auto">
                        {/* Red header */}
                        <div className="bg-sah-red max-[640px]:-mx-4 -mx-10 -mt-10 px-4 xl:px-10 pt-[30px] xl:pt-[50px] pb-[30px] xl:pb-[50px] mb-8">
                            <h2 className="text-[26px] sm:text-[36px] font-medium text-white leading-[36px] sm:leading-[46px]">
                                Edit Profile
                            </h2>
                            <p className="text-red-100 text-[17px] mt-2">Update your personal information below.</p>
                        </div>
                        <EditProfileForm defaultValues={{ firstName, lastName, phone, location, pictureUrl }} />
                    </div>
                </div>
            </section>
        </>
    );
}
