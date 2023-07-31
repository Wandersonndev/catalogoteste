function converterImagem(){
  var receberArquivo = document.getElementById("fotoU").files;
  //console.log(receberArquivo)
  // verificar se a imagem foi pegada
  if(receberArquivo.length > 0){
    //Carregar img
    var carregarImagem = receberArquivo[0];
    //console.log(carregarImagem);
    //permitir ler o conteudo do dispositivo
     var lerArquivo = new FileReader();
  
     lerArquivo.onload = function(arquivoCarregado){
      var imagemBase64 = arquivoCarregado.target.result;
       var fotoP = document.getElementById("fotoP").value = imagemBase64;
      console.log("URL:",fotoP)

      var  img = document.createElement("img")
      img.src = imagemBase64;
      document.getElementById("apresentarimg").innerHTML = img.outerHTML

     }
     //ler o conteudo
     lerArquivo.readAsDataURL(carregarImagem);
  }
}