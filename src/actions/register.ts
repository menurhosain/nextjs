"use server";

export type FormState = {
  errors: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    phone?: string;
  };
};

export async function register_user(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const firstName = (formData.get("firstName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const username = (formData.get("username") as string)?.trim();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const phone = (formData.get("phone") as string)?.trim();

  const errors: FormState["errors"] = {};

  if (!firstName) errors.firstName = "First name is required.";

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!username) {
    errors.username = "Username is required.";
  } else if (username.length < 6) {
    errors.username = "Username must be at least 6 characters.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!phone) errors.phone = "Phone number is required.";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  console.log({
    firstName,
    lastName: formData.get("lastName"),
    email,
    username,
    password,
    confirmPassword,
    phone,
    location: formData.get("location"),
  });

  return { errors: {} };
}
