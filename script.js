// JavaScript for Speech-to-Text Web Page

let isListening = false;
let recognition;
let savedTexts = [];

window.onload = () => {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  let finalTranscript = "";
  recognition.onresult = (event) => {
    let transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    finalTranscript += transcript;
    document.getElementById('textArea').value = finalTranscript;
  };
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event);
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
    document.getElementById('textArea').value = ' ' + clipText + ' ' + document.getElementById('textArea').value;
  });
});

document.getElementById('pasteBehind').addEventListener('click', () => {
  navigator.clipboard.readText().then(clipText => {
    document.getElementById('textArea').value += ' ' + clipText;
  });
});

document.getElementById('addDropdown').addEventListener('click', () => {
  const text = document.getElementById('textArea').value;
  savedTexts.push(text);
  const dropdown = document.getElementById('savedTextDropdown');
  const option = document.createElement('option');
  option.value = text;
  option.text = text;
  dropdown.add(option);
});

document.getElementById('loadDropdown').addEventListener('click', () => {
  const dropdown = document.getElementById('savedTextDropdown');
  const selectedText = dropdown.options[dropdown.selectedIndex].value;
  document.getElementById('textArea').value = selectedText;
});
