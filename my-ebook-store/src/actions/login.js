"use server";
import { signIn } from "@/auth";

export async function doLogin(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/", // Login ke baad Home page pe bhej dega
    });
  } catch (error) {
    if (error.type === 'CredentialsSignin') {
        return { error: 'Invalid credentials!' };
    }
    throw error; // NextJS redirects throw errors, so we need to rethrow
  }
}