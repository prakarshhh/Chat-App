const socket = io();

let senderName = prompt("Please enter your name:"); // Prompt for the sender's name

// Validate the sender's name (you can add more validation as needed)
while (!senderName || senderName.trim() === "") {
  senderName = prompt("Name cannot be empty. Please enter your name:");
}

// Display the sender's name in the chat header
const chatHeader = document.querySelector('.chat-header');
chatHeader.textContent = `WhatsApp Clone - ${senderName}`;

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.querySelector('.chat-messages');

// Function to send a message
function sendMessage() {
  const message = messageInput.value;
  if (message.trim() !== '') {
    socket.emit('chat message', { sender: senderName, message });
    messageInput.value = '';
  }
}

// Event listener for the send button
sendButton.addEventListener('click', sendMessage);

// Event listener for the "Enter" key
messageInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

// Listen for incoming messages
socket.on('chat message', (data) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');

  // Create a div for the sender's name
  const senderNameElement = document.createElement('div');
  senderNameElement.classList.add('sender-name');
  senderNameElement.textContent = data.sender;

  // Create a div for the message text
  const messageTextElement = document.createElement('div');
  messageTextElement.classList.add('message-text');
  messageTextElement.textContent = data.message;

  // Append sender's name and message text to the message container
  messageElement.appendChild(senderNameElement);
  messageElement.appendChild(messageTextElement);

  chatMessages.appendChild(messageElement);
});
