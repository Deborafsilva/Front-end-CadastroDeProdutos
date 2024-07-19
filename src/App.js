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

  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido));

  }, []);

  //Obtendo dados do formulário
  const handlechange = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  }

  // Cadastrar produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        // console.log(retorno_convertido);

        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          setProdutos([...produtos, retorno_convertido]);
          alert('Produto cadastrado com sucesso!');
          limparFormulario();

        }

      })
  }

  // Alterar produto
  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method: 'put',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        // console.log(retorno_convertido);

        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          //Mensagem de alerta
          alert('Produto alterado com sucesso!');

          //Cópia do vetor de produtos
          let vetorTemp = [...produtos];

          //Índice onde está o produto
          let indice = vetorTemp.findIndex((p) => {
            return p.codigo === objProduto.codigo;
          });

          //Alterar o produto do vetorTemp
          vetorTemp[indice] = objProduto;

          //Atualizar o vetor produtos
          setProdutos(vetorTemp);

          //Limpar o formulário
          limparFormulario();

        }

      })
  }

  // Remover produto
  const remover = () => {
    fetch('http://localhost:8080/remover/' + objProduto.codigo, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        // console.log(retorno_convertido);

        //Mensagem de alerta
        alert(retorno_convertido.mensagem);

        //Cópia do vetor de produtos
        let vetorTemp = [...produtos];

        //Índice onde está o produto
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo;
        });

        //Remover o produto do vetorTemp
        vetorTemp.splice(indice, 1);

        //Atualizar o vetor produtos
        setProdutos(vetorTemp);

        //Limpar Formulário
        limparFormulario();

      })
  }

  //Limpar Formulário
  const limparFormulario = () => {
    setObjProduto(produto);
    //botão de cadastrar ficará vísivel
    setBtnCadastrar(true);
  }

  //Selecionar produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }


  return (
    <div>
      {/* <p>{JSON.stringify(objProduto)}</p> TESTE QUE LISTA TODOS OS PRODUTOS NA INTERFACE */}
      <Formulario
        botao={btnCadastrar}
        event={handlechange}
        cadastrar={cadastrar}
        limparForm={objProduto}
        cancelar={limparFormulario}
        remover={remover}
        alterar={alterar}
      />

      <Tabela
        vetor={produtos}
        selecionar={selecionarProduto}
      />
    </div>
  );
}

export default App;
