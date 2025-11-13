const chatBox = document.getElementById('chatBox');
const input = document.getElementById('mensagemInput');
const btn = document.getElementById('enviarBtn');


if (btn) {
btn.addEventListener('click', () => {
const msg = input.value.trim();
if (!msg) return;
const div = document.createElement('div');
div.className = 'chat-msg';
div.innerText = msg;
chatBox.appendChild(div);
input.value = '';
chatBox.scrollTop = chatBox.scrollHeight;
});
}


document.getElementById('menu-toggle')?.addEventListener('click', () => {
document.getElementById('nav-menu').classList.toggle('active');
});