import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <main className="flex flex-col items-center gap-8 px-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          LinkedIn Content Generator
        </h1>
        <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400">
          Supercharge your LinkedIn presence with AI-powered posts. Create engaging content in seconds.
        </p>
        <div className="flex gap-4">
          <SignedIn>
            <Link
              href="/dashboard"
              className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-up"
              className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>
            <Link
              href="/sign-in"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-lg font-semibold text-gray-900 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Sign In
            </Link>
          </SignedOut>
        </div>
      </main>
    </div>
  );
}

