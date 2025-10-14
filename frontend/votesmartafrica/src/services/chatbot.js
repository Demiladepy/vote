// Service to call backend search API for chatbot
export async function fetchChatbotResponse(prompt) {
  try {
    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: prompt, topK: 1 })
    });
    if (!res.ok) throw new Error("API error: " + res.status);
    const data = await res.json();
    // Compose a response from the top hit, fallback if none
    if (data.hits && data.hits.length > 0) {
      const doc = data.hits[0].doc;
      return doc?.text || "No answer found, but the API responded.";
    }
    return "No relevant answer found.";
  } catch (e) {
    return `Error: ${e.message}`;
  }
}
