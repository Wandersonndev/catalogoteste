// URL base da API
const baseUrl = "https://apic-phi.vercel.app/catalago";
let json = null;

async function carregarJSON() {
  try {
    const response = await fetch(baseUrl);
    if (response.ok) {
      return await response.json();
    } else if (response.status === 404) {
      console.warn("Api não encontrada");
      return [];
    } else {
      console.error("Erro ao carregar o Json da Api. Status", response.status);
      return null;
    }
  } catch (error) {
    console.error("Erro ao carregar os dados", error);
    return null;
  }
}

// Gera id
function geraId() {
  return Math.random().toString(36).substring(2, 9);
}

// Verificar se o id existe na API
async function idJaExiste(id) {
  if (!json) {
    json = await carregarJSON();
  }
  return json.some((item) => item.id === id);
}

async function adicionarItem() {
  // Obtenha os valores dos campos do formulário
  const id = document.getElementById("idP").value;
  const nome = document.getElementById("nomeP").value;
  const foto = document.getElementById("fotoP").value;
  const descricao = document.getElementById("descricaoP").value;
  const tamanhoP = document.getElementById("tamanhoP").value;

  // Verificar se o id já existe na API
  let novoId = id || geraId(); // Se o campo ID estiver vazio, gera um novo ID
  while (await idJaExiste(novoId)) {
    novoId = geraId(); // Gera outro ID até encontrar um único
  }

  // Crie um objeto com os dados do novo item
  const novoItem = {
    id: novoId,
    nome: nome,
    foto: foto,
    descricao: descricao,
    elenco: tamanhoP,
  };

  // Envie o novo item para a API usando o método "POST"
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoItem),
    });

    if (response.ok) {
      console.log("Novo item adicionado com sucesso!");
      // Se o item foi adicionado com sucesso, você pode atualizar a lista de itens ou fazer outras ações aqui.
    } else {
      console.error("Erro ao adicionar o novo item. Status:", response.status);
    }
  } catch (error) {
    console.error("Erro ao adicionar o novo item:", error);
  }
}

// Evento ao enviar o formulário
document.getElementById("jsonForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  await adicionarItem();
  // Recarregar a lista após adicionar um novo item
  json = await carregarJSON();
  // Restante do código
});
