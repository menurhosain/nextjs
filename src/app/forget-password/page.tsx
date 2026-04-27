import ForgetPasswordForm from "./forget-password-form";

export default function ForgetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        <ForgetPasswordForm />
        <p className="mt-6 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <a href="/login" className="text-gray-900 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
