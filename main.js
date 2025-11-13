const destinos = [
  { cidade: 'Rio de Janeiro', imagem: 'img/rio.jpg' },
  { cidade: 'Gramado', imagem: 'img/gramado.jpg' },
  { cidade: 'Florianópolis', imagem: 'img/floripa.jpg' },
  { cidade: 'Bonito', imagem: 'img/bonito.jpg' }
];

const container = document.getElementById('destinos');
if (container) {
  destinos.forEach(d => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<img src="${d.imagem}" alt="${d.cidade}" style="width:100%;border-radius:8px;"> <h3>${d.cidade}</h3>`;
    container.appendChild(card);
  });
}

const toggleMenu = () => {
  const nav = document.getElementById('nav-menu');
  if (nav) nav.classList.toggle('active');
};
document.getElementById('menu-toggle')?.addEventListener('click', toggleMenu);

const cadastroBtn = document.getElementById('cadastroBtn');
const loginBtn = document.getElementById('loginBtn');

if (cadastroBtn) {
  cadastroBtn.addEventListener('click', () => {
    const nomeEl = document.getElementById('cadastroNome');
    const emailEl = document.getElementById('cadastroEmail');
    const senhaEl = document.getElementById('cadastroSenha');
    const nome = nomeEl?.value?.trim();
    const email = emailEl?.value?.trim();
    const senha = senhaEl?.value;
    if (!nome || !email || !senha) return alert('Preencha todos os campos');
    const usuario = { nome, email, senha };
    localStorage.setItem(email, JSON.stringify(usuario));
    alert('Cadastro realizado! Faça login.');
    window.location.href = 'login.html';
  });
}

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const email = document.getElementById('loginEmail')?.value?.trim();
    const senha = document.getElementById('loginSenha')?.value;
    if (!email || !senha) return alert('Preencha email e senha');
    const stored = localStorage.getItem(email);
    const user = stored ? JSON.parse(stored) : null;
    if (user && user.senha === senha) {
      localStorage.setItem('usuarioLogado', email);
      window.location.href = 'perfil.html';
    } else {
      alert('Credenciais inválidas');
    }
  });
}

const emailUser = localStorage.getItem('usuarioLogado');
const storedUser = emailUser ? localStorage.getItem(emailUser) : null;
const user = storedUser ? JSON.parse(storedUser) : null;
if (user) {
  const nomeEl = document.getElementById('nomeUsuario');
  const bioEl = document.getElementById('bioUsuario');
  const lista = document.getElementById('listaDestinos');
  if (nomeEl) nomeEl.innerText = user.nome;
  if (bioEl) bioEl.innerText = 'Explorador(a) de novos destinos!';
  const destinosUsuario = ['Rio de Janeiro', 'Florianópolis', 'Gramado'];
  if (lista) {
    destinosUsuario.forEach(d => {
      const li = document.createElement('li');
      li.innerText = d;
      lista.appendChild(li);
    });
  }
}

const chatBox = document.getElementById('chatBox');
const input = document.getElementById('mensagemInput');
const btn = document.getElementById('enviarBtn');

if (btn && input && chatBox) {
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