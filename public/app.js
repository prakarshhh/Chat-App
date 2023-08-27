const socket = io();

let senderName = prompt("Please enter your name:");

while (!senderName || senderName.trim() === "") {
  senderName = prompt("Name cannot be empty. Please enter your name:");
}

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

// Function to create and append a message to the appropriate container
function appendMessage(message, className) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.classList.add('message-bubble', className);
  chatMessages.appendChild(messageElement);
}

// Listen for incoming messages
socket.on('chat message', (data) => {
  const messageClassName = data.sender === senderName ? 'sent' : 'received';
  const messageElement = document.createElement('div');
  messageElement.classList.add('message-bubble', messageClassName);

  // Create a div for the sender's name
  const senderNameElement = document.createElement('div');
  senderNameElement.classList.add('sender-name');
  senderNameElement.innerHTML = `<strong>${data.sender}:</strong> `;

  // Create a div for the message text
  const messageTextElement = document.createElement('div');
  messageTextElement.classList.add('message-text');
  messageTextElement.textContent = data.message;

  // Append sender's name and message text to the message bubble
  messageElement.appendChild(senderNameElement);
  messageElement.appendChild(messageTextElement);

  chatMessages.appendChild(messageElement);
});

