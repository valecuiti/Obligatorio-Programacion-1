let parametros = new URLSearchParams(window.location.search);
let identificador = parametros.get('id');
let producto = productos.at(identificador);
let catalogo = document.querySelector('.catalogo');

// MOSTRAR DATOS SEGÚN PRODUCTO

document.querySelector('#nombre').innerHTML = producto.nombre;
document.querySelector('#precio-cantidad').innerHTML = `$${producto.precio} | ${producto.cantidad}`;
document.querySelector('#descripcion').innerHTML = producto.descripcion;
document.querySelector('#sabor').innerHTML = producto.sabor;
document.querySelector('#origen').innerHTML = producto.origen;
document.querySelector('#intensidad').innerHTML = producto.intensidad;

// SLIDER DE IMAGENES

let imagenes = producto.imagenes;
let slider = document.querySelector('#slider');

let indice = 0;

function mostrarImg() {
    slider.src = imagenes[indice];
}

function atras() {
    if (indice === 0) {
        indice = imagenes.length - 1;
    } else {
        indice--
    }
    mostrarImg()
}

function avanzar() {
    if (indice === imagenes.length - 1) {
        indice = 0;
    } else {
        indice++
    }
    mostrarImg()
}

document.querySelector('#anterior').addEventListener('click', atras);
document.querySelector('#siguiente').addEventListener('click', avanzar);

mostrarImg();

//MOSTRAR PRODUCTOS SUGERIDOS 

for (let productoSugerido of productos) {
    if (productoSugerido.categoria === producto.categoria &&        productoSugerido.id !== producto.id && catalogo.childElementCount < 4) {
        catalogo.innerHTML += `
            <article class="card-producto">
                <a href="ampliacion.html?id=${productoSugerido.id}"><img src="${productoSugerido.imagen}" alt="${productoSugerido.nombre}"></a>
                <p class="serif">${productoSugerido.nombre}</p>
                <p>$${productoSugerido.precio}</p>
                <button class="btn-secondary">Agregar</button>
            </article>
        `;
    }
}