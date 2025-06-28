// ORDENAR PRODUCTOS POR DATE (solo los 3 mas nuevos)

function ordenarPorFecha(productos) {
    let copia = productos.slice();

    copia.sort(function (productoA, productoB) {

        let fechaA = new Date(productoA.fecha);
        let fechaB = new Date(productoB.fecha);

        let diferencia = fechaB - fechaA;

        return diferencia
    })

    return copia;
}

let productosNuevos = ordenarPorFecha(productos);

let seccionNuevos = document.querySelector('.nuevo-cards');

for (let producto of productosNuevos.slice(0, 3)) {
    seccionNuevos.innerHTML += `
    <article class="card-producto">
        <a href="ampliacion.html?id=${producto.id}"><img src="${producto.imagen}" alt="${producto.nombre}"></a>
        <p class="serif">${producto.nombre}</p>
        <p>$${producto.precio}</p>
        <button class="btn-secondary">Agregar</button>
    </article>
`;
}

// MODAL

let contenedorModal = document.querySelector('.contenedor-modal');
let btnCerrar = document.querySelector('.btn-cerrar');
let btnCerrarCodigo = document.querySelector('.btn-cerrar-codigo');
let modal = document.querySelector('.modal');
let modalCodigo = document.querySelector('.modal-codigo');
let txtDescuento = document.querySelector('#txt-descuento');
let codigoDescuento = document.querySelector('#codigo');
let btnGenerarCodigo = document.querySelector('#btn-generar-codigo');
let emailError = document.querySelector('#email-error')

function handleOpenModal() {
    contenedorModal.classList.add('active')
}

function handleCloseModal() {
    contenedorModal.classList.remove('active')

    modal.style.display = 'flex';
    modalCodigo.style.display = 'none';
}

function handleOutsideClick(event) {
    if (event.target === contenedorModal) {
        handleCloseModal();
    }
}

//mostrar modal automaticamente despuess de 2s
setTimeout(handleOpenModal, 2000)

//cerrar modal con botón/apretando afuera
btnCerrar.addEventListener('click', handleCloseModal)
btnCerrarCodigo.addEventListener('click', handleCloseModal)
contenedorModal.addEventListener('click', handleOutsideClick)

//generar codigo random
function crearCodigoRandom() {
    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';

    for (let i = 0; i < 5; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
    }

    return codigo;
}

//validar email y mostrar modal
function mostrarModalCodigo() {
    let inputEmail = document.getElementById("input-email");
    let email = inputEmail.value;

    if (email.includes('@') && email.includes('.')) {
        emailError.innerHTML = '';
        modal.style.display = 'none';
        modalCodigo.style.display = 'flex';

        //se valida y genera descuento random/muestra codigo
        let descuentos = [5, 10, 15, 20];
        let descRandom = Math.floor(Math.random() * descuentos.length);
        let descuento = descuentos[descRandom];
        txtDescuento.innerHTML = `¡Conseguiste un ${descuento}%<br>de descuento!`;
        codigo = crearCodigoRandom();
        codigoDescuento.innerHTML = codigo;
    }
    else {
        emailError.innerHTML = 'Por favor ingresá un email válido';
    }
}

btnGenerarCodigo.addEventListener('click', mostrarModalCodigo);

// copiar codigo con btn
let btnCopiar = document.getElementById('btn-copiar-codigo');
let mensaje = document.getElementById('small-copiar');

function mostrarMensajeCopiado() {
    mensaje.innerHTML = 'código<br>copiado';
}

function mostrarMensajeAnterior() {
    mensaje.innerHTML = 'copiar<br>código';
}

function despuesDeCopiar() {
    mostrarMensajeCopiado();
    setTimeout(mostrarMensajeAnterior, 2000);
}

function copiarCodigo() {
    let codigo = codigoDescuento.innerHTML;
    navigator.clipboard.writeText(codigo)
        .then(despuesDeCopiar);
}

btnCopiar.addEventListener('click', copiarCodigo);

// FORMULARIO

//opciones select
let selectProducto = document.getElementById("producto");

for (producto of productos) {
    let option = document.createElement("option");
    option.value = producto.id;
    option.innerHTML = producto.nombre;
    selectProducto.appendChild(option);
}

//validacion nombre (tiempo real)
let inputNombre = document.getElementById('nombre');
let errorNombre = document.getElementById('error-nombre');

function validarNombre() {
    let nombre = inputNombre.value;

    if (nombre.length > 0) {
        errorNombre.innerHTML = '';
        errorNombre.classList.add('valid');
        errorNombre.classList.remove('error');
        inputNombre.classList.add('valid');
        inputNombre.classList.remove('error');
        return true;
    }
    else {
        errorNombre.innerHTML = 'El nombre no puede estar vacío.';
        errorNombre.classList.add('error');
        errorNombre.classList.remove('valid');
        inputNombre.classList.add('error');
        inputNombre.classList.remove('valid');
        return false;
    }
}

inputNombre.addEventListener('input', validarNombre)

//validación edad (tiempo real)
let inputEdad = document.getElementById('edad');
let errorEdad = document.getElementById('error-edad');

function validarEdad() {
    let edad = Number(inputEdad.value);

    if (edad > 0 && edad < 100) {
        errorEdad.innerHTML = '';
        errorEdad.classList.add('valid');
        errorEdad.classList.remove('error');
        inputEdad.classList.add('valid');
        inputEdad.classList.remove('error');
        return true;
    }
    else {
        errorEdad.innerHTML = 'Esa edad parece de otro planeta... Ingresa una válida.';
        errorEdad.classList.add('error');
        errorEdad.classList.remove('valid');
        inputEdad.classList.add('error');
        inputEdad.classList.remove('valid');
        return false;
    }

}

inputEdad.addEventListener('input', validarEdad)

//validacion comentario (tiempo real)
let inputComentario = document.getElementById('comentario');
let errorComentario = document.getElementById('error-comentario');

function validarComentario() {
    let comentario = inputComentario.value;

    if (comentario.length > 10) {
        errorComentario.innerHTML = '';
        errorComentario.classList.add('valid');
        errorComentario.classList.remove('error');
        inputComentario.classList.add('valid');
        inputComentario.classList.remove('error');
        return true;
    }
    else {
        errorComentario.innerHTML = '¿Tan cortito? Escribinos al menos 10 caracteres.';
        errorComentario.classList.add('error');
        errorComentario.classList.remove('valid');
        inputComentario.classList.add('error');
        inputComentario.classList.remove('valid');
        return false;
    }
}

inputComentario.addEventListener('input', validarComentario)

// validación select
let errorProducto = document.getElementById('error-producto');

function validarProducto() {
    let valor = selectProducto.value;

    if (valor === "Seleccionar") {
        errorProducto.innerHTML = 'Elegí tu producto favorito.';
        selectProducto.classList.add('error');
        selectProducto.classList.remove('valid');
        errorProducto.classList.add('error');
        errorProducto.classList.remove('valid');
        return false;
    } else {
        errorProducto.innerHTML = '';
        selectProducto.classList.add('valid');
        selectProducto.classList.remove('error');
        errorProducto.classList.add('valid');
        errorProducto.classList.remove('error');
        return true;
    }
}

selectProducto.addEventListener('change', validarProducto);

//validacion radio
let form = document.querySelector('form');
let radiosCafe = document.querySelectorAll('input[name="cafe"]');
let errorCafe = document.getElementById('error-cafe');

function validarRadio() {
    let seleccionado = false;

    for (let radio of radiosCafe) {
        if (radio.checked) {
            seleccionado = true;
            break;
        }
    }

    if (!seleccionado) {
        errorCafe.innerHTML = 'Seleccioná una opción de café.';
        errorCafe.classList.add('error');
        errorCafe.classList.remove('valid');
        return false;
    } else {
        errorCafe.innerHTML = '';
        errorCafe.classList.remove('error');
        errorCafe.classList.add('valid');
        return true;
    }
}

// validación al enviar form
form.addEventListener('submit', function (event) {
    let nombreValido = validarNombre();
    let edadValida = validarEdad();
    let comentarioValido = validarComentario();
    let productoValido = validarProducto();
    let radioValido = validarRadio();

    if (!nombreValido || !edadValida || !comentarioValido || !productoValido || !radioValido) {
        event.preventDefault();
    }
});

