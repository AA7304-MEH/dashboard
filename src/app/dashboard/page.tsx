
"use client";

import { useState } from "react";

export default function Dashboard() {
    const [topic, setTopic] = useState("");
    const [tone, setTone] = useState("Professional");
    const [loading, setLoading] = useState(false);
    const [generatedPost, setGeneratedPost] = useState("");
    const [hookScore, setHookScore] = useState<number | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setGeneratedPost("");
        setHookScore(null);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ topic, tone }),
            });

            if (!response.ok) {
                throw new Error("Generation failed");
            }

            const data = await response.json();
            setGeneratedPost(data.post);
            setHookScore(data.hookScore);
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 8) return "text-green-600 dark:text-green-400";
        if (score >= 4) return "text-yellow-600 dark:text-yellow-400";
        return "text-red-600 dark:text-red-400";
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
                    Dashboard
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Create engaging LinkedIn content with AI.
                </p>
            </header>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Generator Card */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-gray-700">
                    <h2 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                        Create a New Post
                    </h2>
                    <form onSubmit={handleGenerate} className="mt-6 space-y-6">
                        <div>
                            <label
                                htmlFor="topic"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                            >
                                What's your topic?
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="topic"
                                    name="topic"
                                    rows={4}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0077B5] sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600"
                                    placeholder="The future of remote work..."
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="tone"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                            >
                                Tone
                            </label>
                            <div className="mt-2">
                                <select
                                    id="tone"
                                    name="tone"
                                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#0077B5] sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600"
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                >
                                    <option>Professional</option>
                                    <option>Casual</option>
                                    <option>Inspirational</option>
                                    <option>Analytical</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center rounded-md bg-[#0077B5] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#005582] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0077B5] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="h-4 w-4 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Generating...
                                </span>
                            ) : (
                                "✨ Generate Post"
                            )}
                        </button>
                    </form>
                </div>

                {/* Results Card */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-800 dark:ring-gray-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                            Your Generated Post
                        </h2>
                        {hookScore !== null && (
                            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-700">
                                <span>Hook Score:</span>
                                <span className={`text-lg font-bold ${getScoreColor(hookScore)}`}>
                                    {hookScore}/10
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="mt-6">
                        {generatedPost ? (
                            <div className="rounded-md bg-gray-50 p-4 text-sm leading-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                                {generatedPost}
                            </div>
                        ) : (
                            <div className="flex h-48 items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400">
                                Your post will appear here
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
