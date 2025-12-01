"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// prevState argument add kiya gaya hai (React 19 useActionState ke liye)
export async function doLogin(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials!";
        default:
          return "Something went wrong!";
      }
    }
    // Next.js redirect ke liye error throw karna zaruri hai
    throw error;
  }
}