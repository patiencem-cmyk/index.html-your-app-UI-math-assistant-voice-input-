// main.js

document.addEventListener("DOMContentLoaded", () => { const status = document.getElementById("status"); const output = document.getElementById("output"); const input = document.getElementById("userInput"); const sendBtn = document.getElementById("sendBtn");

const isOnline = () => navigator.onLine;

function showWelcomeMessage() { if (isOnline()) { speak("Welcome to NAVE, your math assistant. How can I help you today?"); } else { output.innerText = "Welcome to NAVE, your math assistant. (Offline mode active)"; } }

function speak(text) { const utterance = new SpeechSynthesisUtterance(text); utterance.lang = "en-US"; window.speechSynthesis.speak(utterance); }

sendBtn.addEventListener("click", () => { const query = input.value.trim(); if (!query) return; output.innerText = "Thinking...";

if (isOnline()) {
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer YOUR_API_KEY`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: query }]
    })
  })
    .then(res => res.json())
    .then(data => {
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
      output.innerText = reply;
      speak(reply);
    })
    .catch(() => {
      output.innerText = "Something went wrong. Please try again.";
    });
} else {
  try {
    const answer = eval(query);
    output.innerText = `Offline Answer: ${answer}`;
  } catch (e) {
    output.innerText = "Invalid math expression.";
  }
}

});

showWelcomeMessage(); });

