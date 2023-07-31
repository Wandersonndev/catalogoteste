const baseUrl = "https://apic-phi.vercel.app/catalago";

async function carregarJSON(){
  try{
    const response = await fetch(baseUrl);
    if(response.ok){
      return await response.json();
    }else if(response.status === 404){
      console.warn("Api não encotrada")
      return[];
      }else{
        console.error(" Erro ao carregar o Json da Api. Status", response.status);
        return null;
      }
    } catch (error){
      console.error("Erro ao carregar os dados", error);
      return null;
    }
  }
  async function salvarJson(jsonData) {
    try{
      const response = await fetch(`${baseUrl}/${jsonData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      if (response.ok) {
        console.log("Catalago atualizado com sucesso!")
      }else{
        console.error("Erro ao salvar o Catalago. Status:", response.status)
      }
    } catch (error) {
      console.error("Error ao salvar os dados:", error);
    }
  }
  async function excluirItem(id){
    try{
      const response = await fetch(`${baseUrl}/${id}`,{
        method: "DELETE",
      });
      if(response.ok){
        console.log("Item excluido com successo!");
        window.location.href = "not.html"
      }else{
        console.error("Error ao excluir o Item");
      }
    }catch(error){
      throw error;
    }
  }

const form = document.getElementById("jsonForm");
let json = null;

// Função para preencher o formulário com os dados do JSON
function preencherFormulario(id) {
    const item = json.find(item => item.id === id);
    if (item) {
        form.id.value = item.id;
        form.nome.value = item.nome;
        form.foto.value = item.foto;
        form.descricao.value = item.descricao;
        form.elenco.value = item.elenco;
    }else{
      form.id.value = "";
      form.nome.value = "";
      form.foto.value = "";
      form.descricao.value = "";
      form.elenco.value = ""; 
    }
}
 



 function preencherCatalago(item){
  form.id.value = item.id;
  form.nome.value = item.nome;
  form.foto.value = item.foto;
  form.descricao.value = item.descricao;
  form.elenco.value = item.elenco//trocar
 }
 function criarLista(jsonData){
  const lista = document.getElementById('Catalago');
  jsonData.forEach(item =>{
    const itemElement = document.createElement("div")
    const imagenElentor = document.createElement('img');
    const span = document.createElement("span");
    const ButtonDelele = document.createElement("button");
    imagenElentor.src = item.foto;
    itemElement.appendChild(imagenElentor)
    const nomeElementor = document.createElement("span");
    nomeElementor.textContent = item.nome;
    itemElement.appendChild(nomeElementor);
    ButtonDelele.textContent = "Excluir"
    itemElement.appendChild(ButtonDelele);
    itemElement.style.cursor = "pointer";
    
    itemElement.addEventListener("click", function(){
      preencherFormulario(item.id)
    });
    ButtonDelele.addEventListener("click", async function(event){
      event.stopPropagation();
      const confirmacao = confirm("Tem certeza que deseja excluir este item? ");
      if(confirmacao){
        try{
          await excluirItem(item.id);
          jsonData = json.filter(obj => obj.id !== item.id);
          criarLista(json)
        }catch (error) {
          console.error("Error ao excluir o Item", error)
        }
      }
    });
    lista.appendChild(itemElement)

  });
  document.body.appendChild(lista)
 }

// Evento ao enviar o formulário
form.addEventListener("submit",async function (event) {
    event.preventDefault();
    const id = form.id.value;
    const itemIndex = json.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        json[itemIndex].nome = form.nome.value;
        json[itemIndex].foto = form.foto.value;
        json[itemIndex].descricao = form.descricao.value;
        json[itemIndex].elenco = form.elenco.value;
        console.log("Dados atualizados:", json[itemIndex]);
        salvarJson(json[itemIndex
        ]); 
        // Salva o JSON atualizado na API
        window.location.href = "not.html"
    }else {
      // O ID não existe, então cria um novo item
      const novoItem = {
        id: form.id.value,
        nome: form.nome.value,
        foto: form.foto.value,
        descricao: form.descricao.value,
        elenco: form.elenco.value,
      };
      
  
      // Envia o novo item para a API criar um novo registro
      try {
        const response = await fetch(baseUrl, {
          method: "POST", // Usar POST para criar um novo item na API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novoItem),
        });
  
        if (response.ok) {
          console.log("Novo item criado:", novoItem);
          json.push(novoItem);
          criarLista(json);
          window.location.href = "not.html"
        } else {
          console.error("Erro ao criar o novo item. Status:", response.status);
        }
      } catch (error) {
        console.error("Erro ao criar o novo item:", error);
      }
    }
  });
  
// Evento quando o campo de ID é alterado
form.id.addEventListener("change", function () {
    preencherFormulario(form.id.value);
});

// Carregar o JSON a partir da API ou criar um novo objeto vazio se a API retornar erro 404
carregarJSON().then(data => {
    if (data) {
        json = data;
        criarLista(json);
        preencherFormulario(json[0].id);
        //cria a lista
        
    }
});

