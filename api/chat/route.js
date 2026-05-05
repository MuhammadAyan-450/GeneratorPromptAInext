// /app/api/chat/route.js

export async function POST(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { messages } = await req.json();

  if (!process.env.GROQ_API_KEY) {
    return new Response(JSON.stringify({ error: "API key missing" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    const data = await response.json();

    if (!data?.choices?.length || !data.choices[0].message) {
      return new Response(JSON.stringify({ error: "Invalid response from Groq API" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify(data.choices[0].message), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Groq API Error:", error);
    return new Response(JSON.stringify({ error: "Server error connecting to Groq API" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}