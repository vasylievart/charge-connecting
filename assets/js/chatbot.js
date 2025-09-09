const chatContainer = document.querySelector('.chat-container');
const chatbotIframe = document.querySelector('.chatbot-frame');

let isChatbotActive = false;

chatContainer.addEventListener('click', () => {
    isChatbotActive = !isChatbotActive;

    chatContainer.classList.toggle('chat-container--active', isChatbotActive);
    chatbotIframe.classList.toggle('chatbot-frame--active', isChatbotActive);
});

 
 window.addEventListener("message", (event) => {
    if (event.data.type === "chatbot:open") {
      const container = document.querySelector("chatbot-container");
      container.style.width = "400px";
      container.style.height = "600px";
    }
    if (event.data.type === "chatbot:close") {
      const container = document.querySelector("chatbot-container");
      container.style.width = "80px";
      container.style.height = "80px";
    }
  });