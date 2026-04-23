"use client";

import { useState } from "react";

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
    <path
      d="M5 8l2 2 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 7h10M8 3l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="2" width="7" height="7" rx="1.5" fill="currentColor" />
    <rect
      x="11"
      y="2"
      width="7"
      height="7"
      rx="1.5"
      fill="currentColor"
      opacity="0.5"
    />
    <rect
      x="2"
      y="11"
      width="7"
      height="7"
      rx="1.5"
      fill="currentColor"
      opacity="0.5"
    />
    <rect
      x="11"
      y="11"
      width="7"
      height="7"
      rx="1.5"
      fill="currentColor"
      opacity="0.3"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 2L3 5v5c0 4.5 3 7.5 7 8.5C17 17.5 20 14.5 20 10V5l-7-3z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M7 10l2 2 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M13 13l4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M4 17V5a2 2 0 012-2h5l5 5v9a2 2 0 01-2 2H6a2 2 0 01-2-2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M11 3v5h5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 2a6 6 0 00-6 6c0 3-1.5 4-1.5 4h15S16 11 16 8a6 6 0 00-6-6z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M11.73 17a2 2 0 01-3.46 0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="13" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M9.5 9.5l1.5 1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const stats = [
  { num: "2", label: "Integrated portals" },
  { num: "5", label: "Workflow stages" },
  { num: "2FA", label: "Admin security" },
  { num: "EN-AR", label: "Multilingual ready" },
];

const recruitSteps = [
  {
    n: "01",
    title: "Candidate applies online",
    desc: "Multi-step application form with CV upload. Accepts PDF, DOCX and DOC formats up to 5MB. Instant confirmation sent to applicant.",
  },
  {
    n: "02",
    title: "Admin reviews & shortlists",
    desc: "Search and filter applicants by skills, years of experience, location, or current status. Bulk actions supported.",
  },
  {
    n: "03",
    title: "Interview stage",
    desc: "Move candidates to interview. Add internal notes visible only to admins. Candidate receives automated status update by email.",
  },
  {
    n: "04",
    title: "Hire or reject",
    desc: "Final decision recorded with timestamp. Hired candidates are linked to their user account for onboarding. Rejected candidates notified automatically.",
  },
];

const subSteps = [
  {
    n: "01",
    title: "Company registers",
    desc: "Sign up with email and password or Google account. Upload trade license, insurance certificate, and portfolio in one streamlined form.",
  },
  {
    n: "02",
    title: "Admin reviews documents",
    desc: "All uploaded files are accessible in a secure admin directory. Filter companies by trade type, status, or tags. Download any document directly.",
  },
  {
    n: "03",
    title: "Approve, contact, or reject",
    desc: "Admin records a decision with optional notes. Company is notified by email at every stage. Approved companies join your verified subcontractor directory.",
  },
  {
    n: "04",
    title: "Company manages profile",
    desc: "Subcontractors can update company details and re-upload expired documents at any time. Changes automatically reset status for re-review.",
  },
];

const adminTags = [
  "Search by skill",
  "Filter by location",
  "Sort by experience",
  "Export CSV",
  "Add internal notes",
  "Bulk status update",
  "Download CV",
  "View application history",
];

const candidateTags = [
  "Track application status",
  "Update CV anytime",
  "Edit personal profile",
  "Receive email updates",
];

const docTags = [
  "Trade license",
  "Insurance certificate",
  "Company portfolio",
  "PDF format",
  "JPG / PNG images",
  "Max 10MB per file",
];

const features = [
  {
    icon: <GridIcon />,
    color: "text-emerald-600 bg-emerald-50",
    title: "Role-based access",
    desc: "Separate dashboards for candidates, subcontractors, and admins. Each role sees only what they need.",
  },
  {
    icon: <ShieldIcon />,
    color: "text-violet-600 bg-violet-50",
    title: "2FA admin security",
    desc: "All admin accounts are protected with Google Authenticator TOTP. No admin access without a second factor.",
  },
  {
    icon: <SearchIcon />,
    color: "text-sky-600 bg-sky-50",
    title: "Searchable databases",
    desc: "Full-text search, multi-field filtering, and column sorting across both applicant and subcontractor records.",
  },
  {
    icon: <FileIcon />,
    color: "text-amber-600 bg-amber-50",
    title: "Secure file storage",
    desc: "CVs and company documents stored on S3-compatible storage. File type and size validation on every upload.",
  },
  {
    icon: <BellIcon />,
    color: "text-emerald-600 bg-emerald-50",
    title: "Automated notifications",
    desc: "Candidates and companies receive email updates at every workflow stage. No manual follow-up needed.",
  },
  {
    icon: <GoogleIcon />,
    color: "text-violet-600 bg-violet-50",
    title: "Social & Google login",
    desc: "Subcontractor companies can register with Google OAuth. Candidates use email and password with secure session management.",
  },
];

type StepProps = {
  steps: typeof recruitSteps;
  color: "emerald" | "violet";
};

function WorkflowSteps({ steps, color }: StepProps) {
  const numColor =
    color === "emerald"
      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
      : "bg-violet-50 text-violet-700 border border-violet-200";
  const lineColor = color === "emerald" ? "bg-emerald-100" : "bg-violet-100";

  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-5 group">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${numColor}`}
            >
              {step.n}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-px flex-1 my-1 ${lineColor}`}
                style={{ minHeight: "28px" }}
              />
            )}
          </div>
          <div className="pb-7">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              {step.title}
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span
      className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${color}`}
    >
      {label}
    </span>
  );
}

function ApplicantCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="border-b-2 border-emerald-400 px-5 py-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Applicant record
        </p>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">
            SA
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Sarah Al-Mahmoud
            </p>
            <p className="text-xs text-slate-400">
              Senior Engineer · 7 yrs exp
            </p>
          </div>
        </div>
      </div>
      <div className="px-5 py-4 space-y-3">
        {[
          ["Role applied", "Senior Engineer"],
          ["Location", "Dubai, UAE"],
          ["CV uploaded", "sarah_cv.pdf"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm">
            <span className="text-slate-400">{k}</span>
            <span className="text-slate-700 font-medium">{v}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm items-center">
          <span className="text-slate-400">Status</span>
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Interview
          </span>
        </div>
      </div>
    </div>
  );
}

function CompanyCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="border-b-2 border-violet-400 px-5 py-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Company profile
        </p>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700">
            AF
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              AlFarhan Contracting LLC
            </p>
            <p className="text-xs text-slate-400">
              Mohammed Al-Farhan · Contact
            </p>
          </div>
        </div>
      </div>
      <div className="px-5 py-4 space-y-3">
        {[
          ["Trade license", "license_2024.pdf"],
          ["Insurance cert", "insurance_valid.pdf"],
          ["Portfolio", "3 files uploaded"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm">
            <span className="text-slate-400">{k}</span>
            <span className="text-slate-700 font-medium">{v}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm items-center">
          <span className="text-slate-400">Status</span>
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
            Under review
          </span>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"recruitment" | "subcontractor">(
    "recruitment",
  );

  return (
    <main className="min-h-screen bg-white font-sans antialiased text-slate-900">
      {/* SECTION 1 — HERO */}
      <section className="px-6 md:px-16 pt-20 pb-20 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          Enterprise workforce platform
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold leading-[1.08] tracking-tight text-slate-900 mb-6">
              Hire talent.
              <br />
              Onboard
              <br />
              partners.
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-md">
              A unified portal for managing job applicants and subcontractor
              companies — with structured workflows, document management, and
              role-based access built for enterprise operations.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-3 rounded-xl hover:bg-slate-700 transition-colors">
                Explore recruitment portal <ArrowIcon />
              </button>
              <button className="flex items-center gap-2 border border-slate-200 text-slate-700 text-sm font-medium px-5 py-3 rounded-xl hover:bg-slate-50 transition-colors">
                Subcontractor module <ArrowIcon />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            {stats.map((s) => (
              <div
                key={s.num}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <p className="text-3xl font-semibold text-slate-900 mb-1">
                  {s.num}
                </p>
                <p className="text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "CV upload supported",
              color: "bg-emerald-50 text-emerald-700",
            },
            {
              label: "Applicant workflow engine",
              color: "bg-emerald-50 text-emerald-700",
            },
            { label: "Document vault", color: "bg-violet-50 text-violet-700" },
            {
              label: "Google Authenticator 2FA",
              color: "bg-slate-100 text-slate-600",
            },
          ].map((t) => (
            <div
              key={t.label}
              className={`flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg ${t.color}`}
            >
              <CheckIcon /> {t.label}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2 — RECRUITMENT */}
      <section
        id="recruitment"
        className="border-t border-slate-100 bg-slate-50 px-6 md:px-16 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            Module A — Recruitment portal
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-semibold leading-tight text-slate-900 mb-4">
                A smarter way to manage your hiring pipeline
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-10">
                From the moment a candidate applies to the day they're hired —
                every step is tracked, searchable, and auditable. No
                spreadsheets. No lost CVs.
              </p>
              <WorkflowSteps steps={recruitSteps} color="emerald" />
            </div>

            <div className="space-y-4">
              <ApplicantCard />

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  What admins can do
                </p>
                <div className="flex flex-wrap gap-2">
                  {adminTags.map((t) => (
                    <Tag
                      key={t}
                      label={t}
                      color="bg-emerald-50 text-emerald-700 border border-emerald-100"
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  What candidates can do
                </p>
                <div className="flex flex-wrap gap-2">
                  {candidateTags.map((t) => (
                    <Tag
                      key={t}
                      label={t}
                      color="bg-sky-50 text-sky-700 border border-sky-100"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — SUBCONTRACTOR */}
      <section
        id="subcontractor"
        className="border-t border-slate-100 bg-white px-6 md:px-16 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            Module B — Subcontractor registration
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-4 md:order-2">
              <h2 className="text-3xl font-semibold leading-tight text-slate-900 mb-4">
                Qualify and manage your subcontractor network
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-10">
                Replace manual email chains with a structured registration and
                approval process. Every company in your network is verified,
                documented, and searchable.
              </p>
              <WorkflowSteps steps={subSteps} color="violet" />
            </div>

            <div className="space-y-4 md:order-1">
              <CompanyCard />

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Accepted documents
                </p>
                <div className="flex flex-wrap gap-2">
                  {docTags.map((t) => (
                    <Tag
                      key={t}
                      label={t}
                      color="bg-violet-50 text-violet-700 border border-violet-100"
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Approval workflow
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    "Pending",
                    "Under review",
                    "Approved",
                    "Contacted",
                    "Rejected",
                  ].map((s, i, arr) => (
                    <div key={s} className="flex items-center gap-2">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                          s === "Approved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : s === "Rejected"
                              ? "bg-red-50 text-red-600 border-red-200"
                              : s === "Contacted"
                                ? "bg-sky-50 text-sky-700 border-sky-200"
                                : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {s}
                      </span>
                      {i < arr.length - 1 && (
                        <span className="text-slate-300 text-xs">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURES + CTA */}
      <section
        id="features"
        className="border-t border-slate-100 bg-slate-50 px-6 md:px-16 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-slate-200 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            Platform capabilities
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-end mb-14">
            <h2 className="text-3xl font-semibold leading-tight text-slate-900">
              Built for enterprise.
              <br />
              Ready from day one.
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Every feature is designed around the real operational needs of
              enterprise HR and procurement teams — security, search, workflows,
              and notifications included out of the box.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-slate-300 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}
                >
                  {f.icon}
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-2">
                  {f.title}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-3xl px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-xl font-semibold text-white mb-2">
                Ready to streamline your workforce operations?
              </p>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Both portals can be deployed independently or together as a
                unified platform.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button className="flex items-center gap-2 bg-white text-slate-900 text-sm font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors">
                Get started <ArrowIcon />
              </button>
              <button className="flex items-center gap-2 border border-slate-700 text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors">
                View architecture <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 px-6 md:px-16 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-sm bg-white opacity-90" />
            </div>
            <span className="text-sm font-semibold">WorkForce Portal</span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <span>Recruitment Portal</span>
            <span>Subcontractor Module</span>
            <span>Security</span>
            <span>Multilingual (EN-AR)</span>
          </div>
          <p className="text-xs text-slate-300">
            © 2025 WorkForce Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
