// MENU HAMBURGUE
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        navMenu.classList.toggle('active');
    });

    // fecha ao clicar fora
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// DESTINOS
const destinos = [
  {cidade:'Rio de Janeiro', imagem:'img/rio.jpg'},
  {cidade:'Gramado', imagem:'img/gramado3.jpg'},
  {cidade:'Florianópolis', imagem:'img/floripa.jpg'},
  {cidade:'Bonito', imagem:'img/bonito.jpg'}
];
const destinosContainer = document.getElementById('destinosContainer');
if(destinosContainer){
  destinos.forEach(d=>{
    const card=document.createElement('div');
    card.className='card';
    card.innerHTML=`<img src="${d.imagem}" alt="${d.cidade}"><h3>${d.cidade}</h3>`;
    destinosContainer.appendChild(card);
  });
}

// sessionStorage para usuarios
function getUsers(){
  try{
    return JSON.parse(sessionStorage.getItem('usuarios') || '{}');
  }catch{ return {}; }
}
function saveUsers(users){
  sessionStorage.setItem('usuarios', JSON.stringify(users));
}

// CADASTRO E LOGIN
const cadastroBtn = document.getElementById('cadastroBtn');
const loginBtn = document.getElementById('loginBtn');

if(cadastroBtn){
  cadastroBtn.addEventListener('click', ()=> {
    const nomeEl = document.getElementById('cadastroNome');
    const emailEl = document.getElementById('cadastroEmail');
    const senhaEl = document.getElementById('cadastroSenha');
    const fotoEl = document.getElementById('cadastroFoto'); 
    const nome = nomeEl?.value?.trim();
    const email = emailEl?.value?.trim();
    const senha = senhaEl?.value;
    if(!nome || !email || !senha){ alert('Preencha todos os campos'); return; }
    const users = getUsers();
    if(users[email]){ alert('Usuário já existe'); return; }

    const saveUser = (photoDataUrl) => {
      users[email] = { nome, email, senha, photo: photoDataUrl || null };
      saveUsers(users);
      alert('Cadastro realizado! Faça login.');
      window.location.href='login.html';
    };

    const file = fotoEl?.files?.[0];
    if(file){
      const reader = new FileReader();
      reader.onload = () => saveUser(reader.result);
      reader.onerror = () => saveUser(null);
      reader.readAsDataURL(file);
    } else {
      saveUser(null);
    }
  });

  // submit com Enter (não inclui file)
  ['cadastroNome','cadastroEmail','cadastroSenha'].forEach(id=>{
    const el = document.getElementById(id);
    el?.addEventListener('keydown', (e)=>{ if(e.key==='Enter') cadastroBtn.click(); });
  });
}

if(loginBtn){
  loginBtn.addEventListener('click', ()=>{
    const email = document.getElementById('loginEmail')?.value?.trim();
    const senha = document.getElementById('loginSenha')?.value;
    if(!email || !senha){ alert('Preencha email e senha'); return; }
    const users = getUsers();
    const user = users[email];
    if(user && user.senha === senha){
      sessionStorage.setItem('usuarioLogado', email);
      window.location.href='perfil.html';
    }else{
      alert('Credenciais inválidas');
    }
  });

  // Enter key
  ['loginEmail','loginSenha'].forEach(id=>{
    const el = document.getElementById(id);
    el?.addEventListener('keydown', (e)=>{ if(e.key==='Enter') loginBtn.click(); });
  });
}

// PERFIL
const emailLogado = sessionStorage.getItem('usuarioLogado');
if(emailLogado){
  const users = getUsers();
  const user = users[emailLogado];
  if(user){
    const nomeEl=document.getElementById('nomeUsuario');
    const bioEl=document.getElementById('bioUsuario');
    if(nomeEl) nomeEl.innerText=user.nome;
    if(bioEl) bioEl.innerText='Explorador(a) de novos destinos!';
    const listaDestinos=document.getElementById('listaDestinos');
    if(listaDestinos){
      ['Rio de Janeiro','Florianópolis','Gramado'].forEach(d=>{
        const li=document.createElement('li');
        li.innerText=d;
        listaDestinos.appendChild(li);
      });
    }
    // opcional: botão sair
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn){
      logoutBtn.addEventListener('click', ()=>{
        sessionStorage.removeItem('usuarioLogado');
        window.location.href = 'login.html';
      });
    }
  }
}

// CHAT
const chatBox=document.getElementById('chatBox');
const inputMsg=document.getElementById('mensagemInput');
const btnEnviar=document.getElementById('enviarBtn');
if(btnEnviar && inputMsg && chatBox){
  btnEnviar.addEventListener('click', ()=>{
    const msg=inputMsg.value.trim();
    if(!msg) return;
    const div=document.createElement('div');
    div.className='chat-msg';
    div.innerText=msg;
    chatBox.appendChild(div);
    inputMsg.value='';
    chatBox.scrollTop=chatBox.scrollHeight;
  });
  // enviar com Enter
  inputMsg.addEventListener('keydown', (e)=>{ if(e.key==='Enter') btnEnviar.click(); });
}

// SEARCH DESTINOS
const searchInput=document.getElementById('search');
if(searchInput && destinosContainer){
  searchInput.addEventListener('input', e=>{
    const val=(e.target.value || '').toLowerCase();
    destinosContainer.innerHTML='';
    destinos.filter(d=>d.cidade.toLowerCase().includes(val)).forEach(d=>{
      const card=document.createElement('div');
      card.className='card';
      card.innerHTML=`<img src="${d.imagem}" alt="${d.cidade}"><h3>${d.cidade}</h3>`;
      destinosContainer.appendChild(card);
    });
  });
}
