const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

function sendMessage() {
    const message = userInput.value.trim();
    if (message !== '') {
        displayMessage('user', message);
        userInput.value = '';
        sendRequest(message);
    }
}

function displayMessage(role, content) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', role);
    messageElement.innerText = content;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendRequest(message) {
    try {
        const response = await fetch(`/chat?message=${encodeURIComponent(message)}`);
        const data = await response.json();
        const botMessage = data.botMessage;
        displayMessage('bot', botMessage);
    } catch (error) {
        console.error('Error:', error);
        displayMessage('bot', 'Sorry, I couldn\'t understand that.');
    }
}
