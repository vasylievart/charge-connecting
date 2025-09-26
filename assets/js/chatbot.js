
  let intents = null;

  function getLanguage(lang) {
    localStorage.setItem('language', lang);
    location.reload();
  }

  async function loadIntents() {
  const lang = localStorage.getItem('language') || 'en'; 
    try {
      const res = await fetch(`/assets/languages/intents/${lang}.json`);
      intents = await res.json();
      console.log(`✅ Loaded intents for ${lang}`, intents);
    } catch (error) {
      console.error(`❌ Failed to load intents for ${lang}:`, error);
    }
  }

  loadIntents();



  function levenshtein(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
      Array.from({ length: b.length + 1 }, (_, j) =>
        i === 0 ? j : j === 0 ? i : 0
      )
    );

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,       // deletion
          matrix[i][j - 1] + 1,       // insertion
          matrix[i - 1][j - 1] + cost // substitution
        );
      }
    }

    return matrix[a.length][b.length];
  }

  function similarity(a, b) {
    const distance = levenshtein(a.toLowerCase(), b.toLowerCase());
    return 1 - distance / Math.max(a.length, b.length);
  }

  function getResponse(userInput) {
    if (!intents) return "🤔 Still loading knowledge base...";

    let bestMatch = null;
    let highestScore = 0;

    intents.intents.forEach(intent => {
      intent.patterns.forEach(pattern => {
        const score = similarity(userInput, pattern);
        if (score > highestScore) {
          highestScore = score;
          bestMatch = intent.responses[Math.floor(Math.random() * intent.responses.length)];
        }
      });
    });

    return highestScore >= 0.7
      ? bestMatch
      : "🤔 Sorry, I don’t understand. Please contact us via WhatsApp or email.";
  }

  class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            inputField: document.getElementById("chat-input")
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton, inputField} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        inputField.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;
        chatbox.classList.toggle('chatbox--active', this.state);
    }

    onSendButton(chatbox) {
        const inputField = this.args.inputField;
        let userText = inputField.value.trim();
        if (!userText) return;

        // Push user message
        this.messages.push({ name: "User", message: userText });

        // Get chatbot response locally
        const botReply = getResponse(userText);
        this.messages.push({ name: "Sam", message: botReply });

        // Update UI
        this.updateChatText(chatbox);
        inputField.value = "";
    }

    updateChatText(chatbox) {
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        let html = '';

        this.messages.slice().reverse().forEach(item => {
            if (item.name === "Sam") {
                html += `<div class="messages__item messages__item--visitor">${item.message}</div>`;
            } else {
                html += `<div class="messages__item messages__item--operator">${item.message}</div>`;
            }
        });

        chatmessage.innerHTML = html;
        chatmessage.scrollTop = chatmessage.scrollHeight; // auto-scroll
    }
  }


  const chatbox = new Chatbox();
  chatbox.display();


