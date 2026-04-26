import { cookies, headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BASE_URL, CONTRACTOR } from "@/lib/constant";
import { get_application_by_document_id } from "@/services/applicant.service";
import { get_subcontractor_by_document_id } from "@/services/subcontractor.service";

function Field({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (value == null || value === "") return null;
  return (
    <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
      <span className="text-sm text-gray-500 shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-900 sm:text-right">
        {value}
      </span>
    </div>
  );
}

function StatusBadge({ label }: { label?: string }) {
  if (!label) return null;
  return (
    <span className="inline-block text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full capitalize">
      {label}
    </span>
  );
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: documentId } = await params;

  const headersList = await headers();
  const raw = headersList.get("x-user");
  if (!raw) redirect("/login");
  const user = JSON.parse(raw) as Record<string, unknown>;
  const isContractor = user.type === CONTRACTOR;

  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value ?? "";

  const app = isContractor
    ? await get_subcontractor_by_document_id(documentId, jwt)
    : await get_application_by_document_id(documentId, jwt);

  if (!app) redirect("/dashboard");

  const appliedDate = new Date(app.appliedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-2"
          >
            ← Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                {isContractor
                  ? "Contractor Application"
                  : "Recruitment Application"}
              </p>
              <h1 className="text-xl font-semibold text-gray-900">
                {isContractor
                  ? (
                      app as Awaited<
                        ReturnType<typeof get_subcontractor_by_document_id>
                      >
                    )?.companyName
                  : (() => {
                      const a = app as Awaited<
                        ReturnType<typeof get_application_by_document_id>
                      >;
                      return `${a?.firstName ?? ""} ${a?.lastName ?? ""}`.trim();
                    })()}
              </h1>
            </div>
            <StatusBadge label={app.label} />
          </div>

          <div className="divide-y divide-gray-100">
            <Field label="Email" value={app.email} />
            <Field label="Phone" value={app.phone} />
            <Field label="Location" value={app.location} />
            <Field
              label="Experience"
              value={
                app.experienceYears != null
                  ? `${app.experienceYears} years`
                  : null
              }
            />

            {!isContractor &&
              (() => {
                const a = app as Awaited<
                  ReturnType<typeof get_application_by_document_id>
                >;
                return <Field label="Skills" value={a?.skills} />;
              })()}

            <Field label="Applied on" value={appliedDate} />
          </div>

          {isContractor &&
            (() => {
              const a = app as Awaited<
                ReturnType<typeof get_subcontractor_by_document_id>
              >;
              const docs = a?.documents;
              if (!docs || docs.length === 0) return null;
              return (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Documents</p>
                  <ul className="space-y-1.5">
                    {docs.map((doc) => (
                      <li key={doc.id}>
                        <a
                          href={`${BASE_URL}${doc.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline break-all"
                        >
                          {doc.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}

          {!isContractor &&
            (() => {
              const a = app as Awaited<
                ReturnType<typeof get_application_by_document_id>
              >;
              const cv = a?.cvFile;
              if (!cv) return null;
              return (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    CV / Resume
                  </p>
                  <a
                    href={`${BASE_URL}${cv.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline break-all"
                  >
                    {cv.name}
                  </a>
                </div>
              );
            })()}
        </div>
      </div>
    </main>
  );
}
