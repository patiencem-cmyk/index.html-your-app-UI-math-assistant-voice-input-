// script.js
function speakText(text) {
  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(speech);
}

function listenToMath() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript;
    document.getElementById('output').textContent = `You said: ${spokenText}`;

    try {
      const answer = eval(spokenText);
      speakText(`The answer is ${answer}`);
    } catch {
      speakText("Sorry, I couldn’t understand the math.");
    }
  };

  recognition.onerror = (e) => {
    speakText("There was a problem listening.");
    console.error(e);
  };
}
