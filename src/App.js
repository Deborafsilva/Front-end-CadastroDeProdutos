import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './formulario/Formulario';
import Tabela from './tabela/Tabela';


function App() {

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno=> retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));

  },[]);

  return (
    <div>
      <p>{JSON.stringify(produtos)}</p>
      <Formulario botao={btnCadastrar}/>
      <Tabela/>
    </div>
  );
}

export default App;
