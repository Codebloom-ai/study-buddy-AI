# 🧠 Study Buddy AI — Chrome Extension

**Study Buddy AI** is a Chrome Extension that helps students summarize, simplify, and generate quiz questions from any text using Google's Gemini API.  
It’s designed with a clean interface, soft rounded boxes, and pastel colors for a pleasant study experience.

---

## 🚀 Features

- 🧩 Summarizes long paragraphs clearly  
- 📍 Generates clean bullet-point notes  
- ✨ Simplifies complex sentences for easy understanding  
- 🎯 Creates interactive quiz questions  
- 🌐 Detects and keeps the text’s original language (English or French)  
- 🎨 Beautiful UI with rounded grey text areas and soft fonts

---

## 🧪 Testing Instructions

Follow these steps to test the extension on Chrome:

1. **Download or Clone** this repository.  
   - Click the green **Code** button → *Download ZIP*  
   - Or clone using Git:
     ```bash
     git clone https://github.com/YOUR_USERNAME/study-buddy-ai.git
     ```

2. Open Google Chrome and go to:  
   👉 `chrome://extensions/`

3. Enable **Developer Mode** (top right corner).

4. Click **Load unpacked** and select the folder where you downloaded this project.

5. The extension icon will appear in your Chrome toolbar.

6. Click the icon → Paste any text → Click **Analyze Text**  
   You’ll get:
   - 📘 Summary  
   - 🧾 Bullet Points  
   - ✍️ Simplified Text  
   - ❓ Quiz Questions  

---

## ⚙️ Setup Before Running

You need a free **Gemini API key** to make it work.

1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)  
2. Copy your API key.
3. Open the file `popup.js`
4. Paste your key here:

   ```js
   const API_KEY = "YOUR_API_KEY_HERE";

