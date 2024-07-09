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
  const digitar = (e) =>{
    setObjProduto({...objProduto,[e.target.name]:e.target.value});
  }



  return (
    <div>
      {/* <p>{JSON.stringify(objProduto)}</p> TESTE QUE LISTA TODOS OS PRODUTOS NA INTERFACE */}
      <Formulario botao={btnCadastrar} e={digitar}/>
      <Tabela vetor={produtos}/>
    </div>
  );
}

export default App;
