import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

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

document.getElementById("dados").addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("name").value;
  const imgP = document.getElementById("fotoP").value;
  const genero = document.getElementById("generos").value;
  const categoria = document.getElementById("categorias").value;
  const colecoes =document.getElementById("colecoes").value;
  const precos = document.getElementById("precos").value;
  const cor = document.getElementById("cor").value;

  try {
    await addDoc(collection(db, "produtos"), {
      nome: nome,
      imgP: imgP,
      genero: genero,
      categoria:categoria,
      colecoes: colecoes,
      precos: precos,
      cor: cor
    });
    console.log("dados adicionados ao Firestore");
    window.location.href = "/html/admin.html";
  } catch (error) {
    console.error("Erro ao enviar dados para o Firestore:", error);
  }
});
