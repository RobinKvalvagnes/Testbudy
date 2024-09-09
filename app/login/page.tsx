import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import styles from './login.module.css'; 

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    //return redirect("/protected");
    return redirect("/dashboard");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className={styles.container}>
      <Link
        href="/"
        className={styles.backLink}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </Link>

      <h1 className={styles.heading}>Login / Register</h1>

      <form className={styles.form}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          name="email"
          placeholder="you@example.com"
          type="email"
          required
        />

        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <SubmitButton
          formAction={signIn}
          className={styles.signInButton}
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>

        <SubmitButton
          formAction={signUp}
          className={styles.signUpButton}
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>

        {searchParams?.message && (
          <p className={styles.message}>
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}