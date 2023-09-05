// JavaScript for Speech-to-Text Web Page

let isListening = false;
let recognition;

window.onload = () => {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = (event) => {
    let transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    document.getElementById('textArea').value = transcript;
  };
};

document.getElementById('toggleListen').addEventListener('click', () => {
  isListening = !isListening;
  if (isListening) {
    recognition.start();
    document.getElementById('toggleListen').textContent = 'Stop Listening';
  } else {
    recognition.stop();
    document.getElementById('toggleListen').textContent = 'Start Listening';
  }
});

document.getElementById('copyText').addEventListener('click', () => {
  const textArea = document.getElementById('textArea');
  textArea.select();
  document.execCommand('copy');
});

document.getElementById('clearText').addEventListener('click', () => {
  document.getElementById('textArea').value = '';
});

document.getElementById('pasteFront').addEventListener('click', () => {
  navigator.clipboard.readText().then(clipText => {
    document.getElementById('textArea').value = clipText + document.getElementById('textArea').value;
  });
});

document.getElementById('pasteBehind').addEventListener('click', () => {
  navigator.clipboard.readText().then(clipText => {
    document.getElementById('textArea').value += clipText;
  });
});
