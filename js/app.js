//Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];


cargarEventListener();
function cargarEventListener(){
    //Eventos
    listaCursos.addEventListener('click',agregarCurso);
}


//Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        obtenDatosCurso(cursoSeleccionado);
    }
}

function obtenDatosCurso(curso){
    console.log(curso);
    //curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
        }
    console.log(infoCurso);
    
    //Revisamos si ya existe
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const articulos = articulosCarrito.map( curso => {
            if ( curso.id === infoCurso.id ) {
                curso.cantidad += 1;
                return curso;
            } else {
                return curso;
            }
        })
    }else{
        //Agregamos al arreglo de articulos
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML();
    console.log(articulosCarrito);
}

//Mostrar carrito
function carritoHTML() {
    //Limpiamos el html
    limpiarCarrito();

    //Recorremos el carrito y generamos el html
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML=`
        <td>
            <img src="${imagen}" width="120">
        </td>    
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;
        
        // Agregamos al tbody
        contenedorCarrito.appendChild(row);
    });
}

function limpiarCarrito() {
    /*
    contenedorCarrito.innerHTML = '';
    */

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}