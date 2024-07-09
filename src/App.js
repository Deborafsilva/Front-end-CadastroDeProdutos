import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './formulario/Formulario';
import Tabela from './tabela/Tabela';


function App() {

  //Objeto do produto
  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno=> retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));

  },[]);

  //Obtendo dados do formulário
  const handlechange = (e) =>{
    setObjProduto({...objProduto,[e.target.name]:e.target.value});
  }

  // Cadastrar produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar',{
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      // console.log(retorno_convertido);
      
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        setProdutos([...produtos, retorno_convertido]);
        alert('Produto cadastrado com sucesso!');
        
      }
      
    })
  }


  return (
    <div>
      {/* <p>{JSON.stringify(objProduto)}</p> TESTE QUE LISTA TODOS OS PRODUTOS NA INTERFACE */}
      <Formulario 
      botao={btnCadastrar} 
      e={handlechange} 
      cadastrar={cadastrar}
      />

      <Tabela 
      vetor={produtos}
      />
    </div>
  );
}

export default App;
