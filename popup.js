
  const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", async () => {
  const inputText = document.getElementById("inputText").value.trim();
  if (!inputText) {
    alert("Please enter some text!");
    return;
  }

  const API_KEY = "YOUR_API_KEY_HERE"; // 🔹 replace with your key
  const API_BASE = "https://generativelanguage.googleapis.com/v1beta";

  // Utility: clean markdown formatting
  function cleanMarkdown(text) {
    if (!text) return "";
    text = text.replace(/\*\*(.*?)\*\*/g, "$1"); // remove bold **
    text = text.replace(/^\s*\*\s+/gm, "• "); // bullets *
    return text;
  }

  // Step 1: get model
  async function getModel() {
    try {
      const res = await fetch(`${API_BASE}/models?key=${API_KEY}`);
      const data = await res.json();
      if (!data.models || data.models.length === 0) {
        console.error("No models found", data);
        alert("No models available for this API key.");
        return null;
      }
      const flash = data.models.find(m => m.name.includes("flash"));
      const chosen = flash ? flash.name : data.models[0].name;
      console.log("✅ Using model:", chosen);
      return chosen;
    } catch (err) {
      console.error("Error listing models:", err);
      alert("Error listing models. Check console.");
      return null;
    }
  }

  // Step 2: call Gemini
  async function callGemini(prompt) {
    const modelName = await getModel();
    if (!modelName) return "Error: no model";

    const API_URL = `${API_BASE}/${modelName}:generateContent?key=${API_KEY}`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();

      if (!response.ok || !data.candidates) {
        console.error("Gemini API error:", JSON.stringify(data, null, 2));
        alert("⚠️ Error generating content. Check console.");
        return "Error generating content";
      }

      return data.candidates[0].content.parts[0].text;
    } catch (err) {
      console.error("Gemini fetch error:", err);
      alert("Error contacting Gemini API. Check console.");
      return "Error generating content";
    }
  }

  // Step 3: build prompts (keep same language)
  const summaryPrompt = `Summarize the following text in the same language as it is:\n\n${inputText}`;
  const bulletPrompt = `Summarize the text in bullet points in the same language as it is:\n\n${inputText}`;
  const rewritePrompt = `Simplify and rewrite the text to make it easy to understand, keeping the same language:\n\n${inputText}`;
  const quizPrompt = `Generate 5 quiz questions based on this text, keeping the same language:\n\n${inputText}`;

  // Step 4: display results with cleaned formatting
  async function analyzeText() {
    const summaryEl = document.getElementById("summary");
    const bulletsEl = document.getElementById("bulletPoints");
    const simplifiedEl = document.getElementById("simplified");
    const quizEl = document.getElementById("quiz");

    summaryEl.textContent = "⏳ Generating summary...";
    const summary = await callGemini(summaryPrompt);
    summaryEl.textContent = cleanMarkdown(summary);

    bulletsEl.textContent = "⏳ Generating bullet points...";
    const bullets = await callGemini(bulletPrompt);
    bulletsEl.textContent = cleanMarkdown(bullets);

    simplifiedEl.textContent = "⏳ Simplifying text...";
    const simplified = await callGemini(rewritePrompt);
    simplifiedEl.textContent = cleanMarkdown(simplified);

    quizEl.textContent = "⏳ Generating quiz questions...";
    const quiz = await callGemini(quizPrompt);
    quizEl.textContent = cleanMarkdown(quiz);
  }

  analyzeText();
});
