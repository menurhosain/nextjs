import ApplyForm from "./apply-form";

export default function ApplyForContractorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg space-y-6 rounded-2xl bg-white p-8 shadow-lg">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Apply for Contractor</h1>
          <p className="text-sm text-muted-foreground">
            Submit your company details and supporting documents.
          </p>
        </div>
        <ApplyForm />
      </div>
    </main>
  );
}
