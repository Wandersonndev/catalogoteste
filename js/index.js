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
  function criarLista(jsonData){
    const lista = document.getElementById('Catalago');
    jsonData.forEach(item =>{
      const itemElement = document.createElement("div")
      const imagenElentor = document.createElement('img');
      imagenElentor.src = item.foto;
      itemElement.appendChild(imagenElentor)
      const nomeElementor = document.createElement("span");
      nomeElementor.textContent = item.nome;
      itemElement.appendChild(nomeElementor);
      itemElement.style.cursor = "pointer";
      
      //usar
     // itemElement.addEventListener("click", function(){
       // preencherFormulario(item.id)
     // });
    
      lista.appendChild(itemElement)
  
    });
    document.body.appendChild(lista)
   }
   carregarJSON().then(data => {
    if (data) {
        json = data;
        criarLista(json);
        //cria a lista
        
    }
});
  