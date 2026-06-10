import type { Metadata } from "next";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { get_user_subcontractor_applications } from "@/services/subcontractor.service";
import { get_dashboard_page_content } from "@/services/page_content.service";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";
import Navbar from "@/components/navbar";

export const metadata: Metadata = { title: "Dashboard" };

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

    const locale = headersList.get("x-locale") ?? "en";

    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")!.value;

    const [contractorApplications, cms] = await Promise.all([
        get_user_subcontractor_applications(jwt),
        get_dashboard_page_content(locale),
    ]);

    const bannerLabel = cms?.banner?.banner_label ?? "";
    const bannerTitle = cms?.banner?.banner_title ?? "Dashboard";
    const welcomeGreeting = cms?.welcome_greeting ?? "Welcome back,";
    const accountSummaryText = cms?.account_summary_text ?? "Here's a summary of your account.";
    const profileCardLabel = cms?.profile_card_label ?? "Profile";
    const profileCardTitle = cms?.profile_card_title ?? "View & edit your info";
    const profileCardDescription = cms?.profile_card_description ?? "Name, phone, location, profile picture";
    const accountDetailsHeading = cms?.account_details_heading ?? "Account details";
    const emailFieldLabel = cms?.email_field_label ?? "Email";
    const usernameFieldLabel = cms?.username_field_label ?? "Username";
    const accountTypeLabel = cms?.account_type_label ?? "Account type";
    const locationLabel = cms?.location_label ?? "Location";

    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle={bannerLabel} title={bannerTitle} />
                    </div>
                </Left>
                <Right>
                    <div></div>
                </Right>
            </Banner>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
                    <Navbar />

                    {/* Welcome */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {welcomeGreeting} {displayName}!
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">{accountSummaryText}</p>
                    </div>

                    {/* Quick links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="/profile" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{profileCardLabel}</p>
                            <p className="mt-2 text-base font-semibold text-gray-900">{profileCardTitle}</p>
                            <p className="text-sm text-gray-500 mt-1">{profileCardDescription}</p>
                        </a>

                        <a href="/projects" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Subcontracted</p>
                            <p className="mt-2 text-base font-semibold text-gray-900">Browse subcontracted projects</p>
                            <p className="text-sm text-gray-500 mt-1">Submit your company profile and documents</p>
                        </a>
                    </div>

                    {/* Account details */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
                        <h3 className="text-sm font-semibold text-gray-700">{accountDetailsHeading}</h3>
                        <div className="divide-y divide-gray-100 text-sm">
                            {email && (
                                <div className="py-2.5 flex justify-between">
                                    <span className="text-gray-500">{emailFieldLabel}</span>
                                    <span className="font-medium text-gray-900">{email}</span>
                                </div>
                            )}
                            {username && (
                                <div className="py-2.5 flex justify-between">
                                    <span className="text-gray-500">{usernameFieldLabel}</span>
                                    <span className="font-medium text-gray-900">{username}</span>
                                </div>
                            )}
                            {type && (
                                <div className="py-2.5 flex justify-between">
                                    <span className="text-gray-500">{accountTypeLabel}</span>
                                    <span className="font-medium text-gray-900 capitalize">{type}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Subcontractor applications */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-700">My Applications</h3>
                            <a href="/projects" className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-2">
                                + New application
                            </a>
                        </div>

                        {contractorApplications.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                                <p className="text-sm text-gray-500">You haven&apos;t submitted any applications yet.</p>
                                <a href="/projects" className="inline-block mt-3 text-sm font-medium text-gray-900 underline underline-offset-2">
                                    Browse subcontracted projects
                                </a>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {contractorApplications.map((app) => (
                                    <Link
                                        key={app.documentId}
                                        href={`/contractor-applications/${app.documentId}`}
                                        className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-md transition-shadow"
                                    >
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-gray-900">
                                                {app.applied_on_project?.title ?? app.companyName}
                                            </p>
                                            <p className="text-xs text-gray-500">{app.fullName} · {app.title}</p>
                                            <p className="text-xs text-gray-400">{app.companyName} · {app.city}, {app.country}</p>
                                            {app.mainTrades && <p className="text-xs text-gray-400">{app.mainTrades}</p>}
                                        </div>
                                        <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                                            {app.label && <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{app.label}</span>}
                                            <p className="text-xs text-gray-400">{new Date(app.appliedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
