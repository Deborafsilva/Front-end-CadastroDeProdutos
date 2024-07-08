import { useState } from 'react';
import './App.css';
import Formulario from './formulario/Formulario';
import Tabela from './tabela/Tabela';


function App() {

  const [btnCadastrar, setBtnCadastrar] = useState(true);

  return (
    <div>
      <Formulario botao={btnCadastrar}/>
      <Tabela/>
    </div>
  );
}

export default App;
