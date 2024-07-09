import React from 'react'

export default function Formulario({ botao, e, cadastrar, limparForm }) {
    return (
        <form>
            <input type='text' value={limparForm.nome} onChange={e} name='nome' placeholder='Nome' className='form-control' />
            <input type='text' value={limparForm.marca} onChange={e} name='marca' placeholder='Marca' className='form-control' />

            {/* CRIANDO UMA CONDICIONAL */}
            {
                botao
                    ? //se for true irá mostrar btn Cadastrar
                    <input type='button' value='Cadastrar' onClick={cadastrar} className='btn btn-primary' />
                    : //senão, no caso de ser false retorna os demais btn's
                    <div>
                        <input type='button' value='Alterar' className='btn btn-warning' />
                        <input type='button' value='Remover' className='btn btn-danger' />
                        <input type='button' value='Cancelar' className='btn btn-secondary' />
                    </div>
            }
        </form>
    )
}
