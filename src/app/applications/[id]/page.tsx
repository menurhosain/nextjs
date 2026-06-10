import { cookies, headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BASE_URL } from "@/lib/constant";
import { get_application_by_document_id } from "@/services/applicant.service";
import { Banner, Left, Right } from "@/components/ui/banner";
import Banner_Title from "@/components/ui/banner-title";

const STATUS_STYLES: Record<string, string> = {
    new: "bg-blue-50 text-blue-600",
    shortlisted: "bg-yellow-50 text-yellow-600",
    interview: "bg-purple-50 text-purple-600",
    hired: "bg-green-50 text-green-600",
    rejected: "bg-red-50 text-red-500",
};

function Field({ label, value }: { label: string; value?: string | number | null }) {
    if (value == null || value === "") return null;
    return (
        <div className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
            <span className="text-sm text-gray-400 shrink-0">{label}</span>
            <span className="text-sm font-medium text-gray-900 sm:text-right">{value}</span>
        </div>
    );
}

function FileLink({ label, url, name }: { label: string; url?: string | null; name?: string | null }) {
    if (!url || !name) return null;
    return (
        <div className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
            <span className="text-sm text-gray-400 shrink-0">{label}</span>
            <a
                href={`${BASE_URL}${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-sah-red hover:underline underline-offset-2 sm:text-right break-all"
            >
                {name}
            </a>
        </div>
    );
}

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: documentId } = await params;

    const headersList = await headers();
    const raw = headersList.get("x-user");
    if (!raw) redirect("/login");

    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value ?? "";

    const app = await get_application_by_document_id(documentId, jwt);
    if (!app) redirect("/dashboard");

    const appliedDate = new Date(app.appliedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const statusStyle = STATUS_STYLES[app.label ?? ""] ?? "bg-gray-100 text-gray-500";

    return (
        <>
            <Banner bg="/home-hero.mp4" class_name="lg:min-h-[auto] xl:min-h-[auto] md:min-h-[auto] 2xl:h-[100vh] py-18 2xl:py-0 max-[640px]:pb-[65px]">
                <Left class_name="max-[640px]:pt-[70px]">
                    <div className="flex flex-col justify-center">
                        <Banner_Title subtitle="Recruitment" title="Application Detail" />
                    </div>
                </Left>
                <Right><div></div></Right>
            </Banner>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
                    <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </Link>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-sah-red/10 text-sah-red flex items-center justify-center text-lg font-bold uppercase select-none shrink-0">
                                    {app.fullName?.charAt(0) ?? "?"}
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">Applicant</p>
                                    <h1 className="text-lg font-semibold text-gray-900 leading-tight">{app.fullName}</h1>
                                    <p className="text-sm text-gray-500 mt-0.5">{app.applied_job?.title ?? "—"}</p>
                                </div>
                            </div>
                            {app.label && (
                                <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusStyle}`}>
                                    {app.label}
                                </span>
                            )}
                        </div>

                        {/* Personal info */}
                        <div className="px-6 divide-y divide-gray-100">
                            <Field label="Email" value={app.email} />
                            <Field label="Phone" value={app.phone} />
                            <Field label="Nationality" value={app.nationality} />
                            <Field label="Current Location" value={app.currentLocation} />
                            <Field label="Years of Experience" value={app.experienceYears != null ? `${app.experienceYears} year${app.experienceYears !== 1 ? "s" : ""}` : null} />
                            <Field
                                label="Experience in GCC"
                                value={app.gccExperience === "yes" ? "Yes" : app.gccExperience === "no" ? "No" : null}
                            />
                        </div>

                        {/* Files */}
                        <div className="px-6 divide-y divide-gray-100">
                            <FileLink label="CV" url={app.cv?.url} name={app.cv?.name} />
                            <FileLink label="Cover Letter" url={app.coverLetter?.url} name={app.coverLetter?.name} />
                        </div>

                        {/* Photo */}
                        {app.photo?.url && (
                            <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <span className="text-sm text-gray-400">Photo</span>
                                <img
                                    src={`${BASE_URL}${app.photo.url}`}
                                    alt={app.fullName}
                                    className="w-16 h-16 rounded-full object-cover border border-gray-200"
                                />
                            </div>
                        )}

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-xs text-gray-400">Applied on</span>
                            <span className="text-xs font-medium text-gray-600">{appliedDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
