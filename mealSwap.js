const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const openaiKey = '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';

async function sendMessage(message) {
  addMessageToChat(message, 'user');
  addMessageToChat("Thinking... 💭", 'bot', true);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a fitness and nutrition coach that only suggests healthy Indian meal swaps. Keep replies short and to the point."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await res.json();
    const reply = data.choices[0].message.content;
    updateLastBotMessage(reply);
  } catch (err) {
    console.error(err);
    updateLastBotMessage("❌ Sorry, I couldn't fetch the suggestion.");
  }
}

function addMessageToChat(message, type, isTemp = false) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `${type}-message`;
  msgDiv.textContent = message;
  if (isTemp) msgDiv.id = "temp-bot-msg";
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function updateLastBotMessage(message) {
  const temp = document.getElementById("temp-bot-msg");
  if (temp) {
    temp.textContent = message;
    temp.removeAttribute("id");
  }
}

sendBtn.addEventListener('click', () => {
  const msg = userInput.value.trim();
  if (msg) {
    sendMessage(msg);
    userInput.value = "";
  }
});

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
