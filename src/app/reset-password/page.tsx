import ResetPasswordForm from "./reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        {code ? (
          <ResetPasswordForm code={code} />
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid link</h1>
            <p className="text-sm text-gray-500 mb-6">
              This reset link is missing a token. Please request a new one.
            </p>
            <a
              href="/forget-password"
              className="block w-full text-center bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Request new link
            </a>
          </>
        )}
      </div>
    </div>
  );
}
