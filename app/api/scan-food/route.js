export async function POST(request) {
    try {
          const { image, mediaType } = await request.json();
          if (!image) {
                  return Response.json({ error: "No image provided" }, { status: 400 });
          }
          const apiKey = process.env.ANTHROPIC_API_KEY;
          if (!apiKey) {
                  return Response.json({ error: "API key not configured." }, { status: 500 });
          }
          const response = await fetch("https://api.anthropic.com/v1/messages", {
                  method: "POST",
                  headers: {
                            "Content-Type": "application/json",
                            "x-api-key": apiKey,
                            "anthropic-version": "2023-06-01",
                  },
                  body: JSON.stringify({
                            model: "claude-sonnet-4-20250514",
                            max_tokens: 1000,
                            messages: [{
                                        role: "user",
                                        content: [
                                          { type: "image", source: { type: "base64", media_type: mediaType || "image/jpeg", data: image } },
                                          { type: "text", text: `You are a nutrition analyst for a health app targeting Black men over 50. Analyze this food image and respond ONLY with a JSON object (no markdown): { "foods": [{"name":"Food name","portion":"size","calories":0,"protein":0,"carbs":0,"fat":0,"fiber":0,"icon":"emoji"}], "total_calories":0,"total_protein":0,"total_carbs":0,"total_fat":0,"total_fiber":0, "health_tip":"culturally relevant tip","health_rating":"green/yellow/red","rating_reason":"brief reason" }` }
                                                    ],
                            }],
                  }),
          });
          if (!response.ok) {
                  return Response.json({ error: `AI service error (${response.status})` }, { status: 502 });
          }
          const data = await response.json();
          const text = data.content?.map((b) => b.text || "").join("") || "";
          const cleaned = text.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          return Response.json(parsed);
    } catch (error) {
          console.error("Scan error:", error);
          return Response.json({ error: "Failed to analyze food image." }, { status: 500 });
    }
}
