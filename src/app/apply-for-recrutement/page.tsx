import ApplyForm from "./apply-form";

export default function ApplyForRecrutementPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Apply for Recruitment</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the form below to submit your application.
          </p>
        </div>
        <ApplyForm />
      </div>
    </main>
  );
}
