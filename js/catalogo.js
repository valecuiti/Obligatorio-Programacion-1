let catalogo = document.querySelector('.catalogo');
let botonesFiltro = document.querySelectorAll('.filtro');
let searchBar = document.querySelector('#searchBar')
let mensaje = document.querySelector('.mensaje-vacio');
let categoriaActual = 'todo';

// GENERAR CARDS

function cargarCatalogo(lista) {
    catalogo.innerHTML = '';

    for (let producto of lista) {
        catalogo.innerHTML += `
            <article class="card-producto">
                <a href="ampliacion.html?id=${producto.id}"><img src="${producto.imagen}" alt="${producto.nombre}"></a>
                <p class="serif">${producto.nombre}</p>
                <p>$${producto.precio}</p>
                <button class="btn-secondary">Agregar</button>
            </article>
        `;
    }

    if (lista.length === 0) {
        mensaje.style.display = 'block';
    } else {
        mensaje.style.display = 'none';
    }
}

// FILTRADO POR BOTONES

function filtrarPorCategoria(categoria) {
    categoriaActual = categoria;

    if (categoria === 'todo') {
        cargarCatalogo(productos);
    } else {
        let productosFiltrados = [];
        for (let producto of productos) {
            if (producto.categoria === categoria) {
                productosFiltrados.push(producto);
            }
        }
        cargarCatalogo(productosFiltrados);
    }
}

function manejarClick(event) {
    for (let otroBoton of botonesFiltro) {
        otroBoton.classList.remove('filtro-activo');
    }

    let botonClickeado = event.currentTarget;
    botonClickeado.classList.add('filtro-activo');

    let categoria = botonClickeado.getAttribute('data-categoria');
    filtrarPorCategoria(categoria);
}

for (let boton of botonesFiltro) {
    boton.addEventListener('click', manejarClick);
}

cargarCatalogo(productos);

// FILTRADO POR SEARCHBAR

searchBar.addEventListener('input', filtrarProductos)

function filtrarProductos() {
    let texto = searchBar.value.toLowerCase();
    let productosFiltrados = [];
    let productosBase = [];

    if (categoriaActual === 'todo') {
        productosBase = productos;
    }
    else {
        for (let producto of productos) {
            if (producto.categoria === categoriaActual) {
                productosBase.push(producto);
            }
        }
    }

    for (let producto of productosBase) {
        let nombre = producto.nombre.toLowerCase();
        if (nombre.includes(texto)) {
            productosFiltrados.push(producto)
        }
    }

    cargarCatalogo(productosFiltrados);
}


