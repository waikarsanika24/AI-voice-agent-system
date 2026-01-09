document.addEventListener("DOMContentLoaded", () => {

  const chatArea = document.getElementById("chatArea");
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");

  if (!chatArea || !chatInput || !sendBtn) {
    console.error("Chat elements not found!");
    return;
  }

  function addMessage(text, sender = "user") {
    const wrapper = document.createElement("div");
    wrapper.className = sender === "user"
      ? "flex justify-end"
      : "flex justify-start";

    const bubble = document.createElement("div");
    bubble.className = sender === "user"
      ? "bg-primary text-white px-4 py-2 rounded-2xl rounded-tr-sm text-sm max-w-[90%]"
      : "bg-lightBg dark:bg-white/5 border border-lightBorder dark:border-border text-slate-700 dark:text-gray-300 px-4 py-2 rounded-2xl rounded-tl-sm text-sm max-w-[90%]";

    bubble.textContent = text;
    wrapper.appendChild(bubble);
    chatArea.appendChild(wrapper);

    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // User message
    addMessage(message, "user");
    chatInput.value = "";

    // Fake AI reply
    setTimeout(() => {
      addMessage("🤖 Alex: I received your message → " + message, "bot");
    }, 700);
  }

  sendBtn.addEventListener("click", sendMessage);

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

});
const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    // Chat input focus + preset text
    chatInput.value = "Search for ";
    chatInput.focus();

    // System message
    addMessage("🔍 What would you like to search for?", "bot");
  });
}
function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  chatInput.value = "";

  // SEARCH DETECTION
  if (message.toLowerCase().startsWith("search")) {
    setTimeout(() => {
      addMessage("🔎 Searching results for: " + message.replace("search for", ""), "bot");
    }, 800);
    return;
  }

  // NORMAL REPLY
  setTimeout(() => {
    addMessage("🤖 Alex: I received your message → " + message, "bot");
  }, 700);
}
