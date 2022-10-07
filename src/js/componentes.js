
import { Todo } from '../classes'
import { todoList } from '../index';
//Referenacia a HTML

const divTodoList       = document.querySelector('.todo-list');
const txtInput          = document.querySelector('.new-todo');
const borrarCompletados = document.querySelector('.clear-completed');
const ulFiltros         = document.querySelector('.filters');
const anchorFiltros     = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
        <li class="${ (todo.completado) ? 'completed' : '' } " data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${( todo.completado ) ? 'checked' : ''}>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `;

    const div = document.createElement('div');

    div.innerHTML = htmlTodo;

    divTodoList.append(  div.firstElementChild );

    return div.firstElementChild;

}

//Eventos

txtInput.addEventListener('keyup', ( event ) => {
    
    if ( event.keyCode == 13 && txtInput.value.length > 0 ){
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );

        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', ( event ) =>{

    const elementoClicado = event.target.localName; //input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if( elementoClicado.includes('input') ){

        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    } else if( elementoClicado.includes('button') ){

        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }
});

borrarCompletados.addEventListener('click', () => {

    todoList.borrarCompletados();
    for( let i = divTodoList.children.length - 1; i >= 0; i-- ){

        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild( elemento );
        }

    }

});

ulFiltros.addEventListener('click', ( event ) =>{
    const filtro = event.target.text;

    if( !filtro ){ return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    

    for( const elemento of divTodoList.children ){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){

            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
                break;
        
            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});


