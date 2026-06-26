import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { topic, depth, tone, useCase, audience, outputFormat } =
      await request.json();

    if (!topic || !topic.trim()) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const systemPrompt = `You are a world-class prompt engineer who specializes in crafting highly effective, structured prompts for ChatGPT and other large language models.

Your job is to write a single, complete, professional prompt that a user can copy and paste directly into ChatGPT to get exceptional results.

RULES:
- Write ONLY the prompt itself — no explanation, no preamble, no "Here is your prompt:", no quotes around it
- The prompt should be detailed, specific, and professionally structured
- Include role-setting (e.g., "Act as a..."), clear task description, output format instructions, and quality requirements
- The prompt should be ready to paste into ChatGPT as-is
- Length: 80-200 words — thorough but not bloated`;

    const userMessage = `Create a professional ChatGPT prompt for the following:

Topic / Task: ${topic}
Depth Level: ${depth}
Tone: ${tone}
Use Case: ${useCase}
Target Audience: ${audience}
Desired Output Format: ${outputFormat}

Write ONLY the prompt text, ready to paste into ChatGPT.`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 600,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq API error:", response.status, errorData);
      return NextResponse.json(
        { error: `Groq API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const generatedPrompt =
      data.choices?.[0]?.message?.content?.trim() || "";

    if (!generatedPrompt) {
      return NextResponse.json(
        { error: "Empty response from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ prompt: generatedPrompt });
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}