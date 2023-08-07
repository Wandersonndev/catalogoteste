
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCpCFl38gfVWmCQHarvtXECnTRc5TfFtA",
  authDomain: "catalogo-355b9.firebaseapp.com",
  projectId: "catalogo-355b9",
  storageBucket: "catalogo-355b9.appspot.com",
  messagingSenderId: "76937050583",
  appId: "1:76937050583:web:0b287f931eea3144e2b392"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Criar referência para o serviço de autenticação
const auth = getAuth();

// Adicionar um evento de envio de formulário para autenticar o usuário
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Evitar o comportamento padrão do formulário

  const email = document.getElementById("email").value;
  const password = document.getElementById("email").value;

  // Autenticar o usuário com o e-mail e senha fornecidos
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // O login foi bem-sucedido, redirecionar para a página de administração
      window.location.href = "/admin.html";
    })
    .catch((error) => {
      // Tratar erros de autenticação, por exemplo, exibir uma mensagem de erro para o usuário
      console.error("Erro de login:", error.message);
    });
});
