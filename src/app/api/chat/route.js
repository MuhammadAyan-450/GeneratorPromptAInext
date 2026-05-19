export async function POST(req) {
  const { messages } = await req.json();

  if (!process.env.GROQ_API_KEY) {
    return new Response(JSON.stringify({ error: "API key missing" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Add system message if not present
  const fullMessages = messages[0]?.role === "system" ? messages : [
    {
      role: "system",
      content: "You are a helpful AI assistant. Give clear, concise, and helpful responses. You can help with generating prompts for ChatGPT, Claude, Midjourney, writing content, coding, and answering questions."
    },
    ...messages
  ];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("Groq API error:", errData);
      return new Response(JSON.stringify({ 
        error: errData?.error?.message || "Groq API error" 
      }), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await response.json();

    if (!data?.choices?.length || !data.choices[0].message) {
      return new Response(JSON.stringify({ error: "Invalid API response" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify(data.choices[0].message), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: "Server error: " + error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}