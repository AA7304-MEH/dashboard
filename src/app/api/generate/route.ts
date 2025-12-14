import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";

export async function POST(request: Request) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topic, tone } = await request.json();

    if (!topic) {
        return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const openai = new OpenAI({
        apiKey: apiKey,
    });

    try {
        const prompt = `Write a professional and engaging LinkedIn post about "${topic}". The tone should be ${tone}. 
        Also, provide a "Hook Score" for this post (from 1 to 10) based on how attention-grabbing the first sentence is.
        Return the response in JSON format with two keys: "post" (the text content) and "hookScore" (number).`;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-4o-mini", // Using a cost-effective model
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0].message.content;

        if (!content) {
            throw new Error("No content generated");
        }

        const data = JSON.parse(content);

        return NextResponse.json({
            post: data.post,
            hookScore: data.hookScore
        });

    } catch (error) {
        console.error("OpenAI Error:", error);
        return NextResponse.json({ error: "Failed to generate post" }, { status: 500 });
    }
}
