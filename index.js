const btn = document.querySelector('.contacts__button');
const text = document.querySelector('.contacts__textarea');

btn.addEventListener('pointerup', () => { sendMessage()});

function sendMessage() {
  text.value = '';
  alert('Сообщение отправлено!');
}