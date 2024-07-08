import React from 'react'

export default function Formulario({ botao }) {
    return (
        <form>
            <input type='text' placeholder='Nome' className='form-control' />
            <input type='text' placeholder='Marca' className='form-control' />

            {/* CRIANDO UMA CONDICIONAL */}
            {
                botao
                    ? //se for true irá mostrar btn Cadastrar
                    <input type='button' value='Cadastrar' className='btn btn-primary' />
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
