const filaGeral = new FilaEncadeada();
const filaPriotaria = new FilaEncadeada();
let cont = 0;
// outra fila
function addElemento(){
   const nome = document.getElementById("txtnovoNome");
   const cpf = document.getElementById("txtnovoCPF");
   const data = document.getElementById("txtnovaData");
    // data de nascimento
   // if(!minhaFila.isFull()){
       const novoAtendimento = new Atendimento();
         novoAtendimento.nome = nome.value;
         novoAtendimento.cpf = cpf.value;
         novoAtendimento.data_nascimento = data.value;
         novoAtendimento.data = obterDataAtual();
         novoAtendimento.hora = obterHoraAtual();
      if(calcularIdade(novoAtendimento.data_nascimento) >= 60){
        filaPriotaria.enqueue(novoAtendimento);
        mostrarFila();
        nome.value = ""; 
        cpf.value = ""; 
        data.value = "";
        nome.focus(); 
      }
      else{
        filaGeral.enqueue(novoAtendimento);
        mostrarFila();
        nome.value = ""; 
        cpf.value = ""; 
        data.value = "";
        nome.focus(); 
      }
   // } 
   // else
    //    alert("Fila cheia!");     
}// fim addElemento
//-----------------------------------
function atenderFila(){
  if(!filaPriotaria.isEmpty() && cont <= 3){
    let pessoaAtendida = filaPriotaria.dequeue();
    mostrarMensagemRemocao(pessoaAtendida);
    cont++;
    // Armazena o último atendido no localStorage
    localStorage.setItem('ultimoAtendido', pessoaAtendida.nome);
    mostrarFila();
  }
  if(!filaGeral.isEmpty()){
      let pessoaAtendida = filaGeral.dequeue();
      mostrarMensagemRemocao(pessoaAtendida);
      // Armazena o último atendido no localStorage
      localStorage.setItem('ultimoAtendido', pessoaAtendida.nome);
      mostrarFila();
      //salvar no banco texto do navegador
   }
   else
      alert("Filas vazia!");
}
//--------------------------------------------------------------------------------------------
 function buscarCpf() {
    const cpf = document.getElementById("txtnovoCPF");
    let encontrou=false;
    let posicao=0;
    for (const item of filaGeral) {
      posicao++;
      if (item.cpf===cpf.value) {
        encontrou=true;
        alert("CPF encontrado na fila! Posição: " + posicao);
      }
    }
    if(encontrou===false)
      alert("CPF não encontrado na fila!");
}
//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(pessoaAtendida) {
    const mensagem = document.getElementById("mensagem-remocao");
    mensagem.innerText ="Chamando para ser atendido(a): "+ pessoaAtendida.nome + ", chegou às " + pessoaAtendida.hora + " está sendo atendido(a) às " + obterHoraAtual()+ ". Tempo de espera: "+calcularDiferencaHoras(pessoaAtendida.hora, obterHoraAtual());
    mensagem.style.display = "block";
}
//--------------------------------------------------------------------------------------------
 function mostrarFila() {
  console.log("Fila atual: " + filaGeral.toString());
  console.log("Fila atual: " + filaPriotaria.toString());

  const listaPessoasFila = document.getElementById("listFila");
  const lblPessoasFila = document.getElementById("lblPessoasFila");

  listaPessoasFila.innerText = ""; // Limpa a lista antes de adicionar novos itens

  if (filaPriotaria.isEmpty() && filaGeral.isEmpty()) {
      lblPessoasFila.innerText = "Filas Vazias!";
  } 
  else {
      if (!filaPriotaria.isEmpty()) {
          lblPessoasFila.innerText = "Pessoas na fila:";
          
          const tituloPrioritaria = document.createElement("li");
          tituloPrioritaria.innerText = "Fila Prioritária:";
          listaPessoasFila.appendChild(tituloPrioritaria);

          for (const atendimento of filaPriotaria) {
              const li = document.createElement("li");
              li.innerText = atendimento.toString();
              listaPessoasFila.appendChild(li);
          }
      }
      
  if (!filaGeral.isEmpty()) {
          const tituloSemPrioridade = document.createElement("li");
          tituloSemPrioridade.innerText = "Fila Geral:";
          listaPessoasFila.appendChild(tituloSemPrioridade);

          for (const atendimento of filaGeral) {
              const li = document.createElement("li");
              li.innerText = atendimento.toString();
              listaPessoasFila.appendChild(li);
          }
      }
  }
}

//--------------------------------------------------------------------------------------------
 // funcao data
 function obterDataAtual() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
    let ano = dataAtual.getFullYear();
    // Formata a data como "dd/mm/aaaa"
    let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);
  
  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
  
  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;
  
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
//-----------------------------------------------------------------------------------------
function calcularIdade(dataNascimento) {
  // Espera data no formato "dd/mm/aaaa"
  const [dia, mes, ano] = dataNascimento.split('/').map(Number);

  const hoje = new Date();
  const dataNasc = new Date(ano, mes - 1, dia); // Mês começa em 0 no JavaScript

  let idade = hoje.getFullYear() - dataNasc.getFullYear();
  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();

  // Verifica se a pessoa ainda não fez aniversário neste ano
  if (mesAtual < mes - 1 || (mesAtual === mes - 1 && diaAtual < dia)) {
    idade--;
  }

  return idade;
}
//------------------------------------------------------------------------------------------