<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrito</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <link rel="stylesheet" href="csss/main.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
</head>

<body>

    <div class="wrapper">
        <header class="header-mobile">
            <h1 class="logo">DecoracionesJo</h1>
            <button class="open-menu" id="open-menu">
                <i class="bi bi-list"></i>
            </button>
        </header>
        <aside>
            <button class="close-menu" id="close-menu">
                <i class="bi bi-x"></i>
            </button>
            <header>
                
            </header>
            <nav>
                <ul>
                    <li>
                        <a class="boton-menu boton-volver" href="./index.html">
                            <i class="bi bi-arrow-return-left"></i> Volver
                        </a>
                    </li>
                    <li>
                        <a class="boton-menu boton-carrito active" href="./carrito.php">
                            <i class="bi bi-cart-fill"></i> Actualizar Carrito
                        </a>
                    </li>
                </ul>
            </nav>
            <footer>
                <p class="texto-footer">© 2023 DecoracionesJo</p>
            </footer>
        </aside>

        <main>
            <!-- <h2 class="titulo-principal">Carrito</h2> -->
            <div class="contenedor-carrito">
                <p id="carrito-vacio" class="carrito-vacio">Tu carrito está vacío 🙉.</i></p>

                <div id="carrito-productos" class="carrito-productos disabled">
                    <!-- Esto se va a completar con el JS -->
                </div>

                <div id="carrito-acciones" class="carrito-acciones disabled">
                    <div class="carrito-acciones-izquierda">
                        <button id="carrito-acciones-vaciar" class="carrito-acciones-vaciar">Vaciar carrito</button>
                    </div>
                    <div class="carrito-acciones-derecha">
                        <div class="carrito-acciones-total">
                            <p>Total</p>
                            <p id="total">$</p>
                            <p>Enviar pedido</p>
                        </div>
                        <button class="carrito-acciones-comprar"></button>
                    </div>

                   
                </div>
       
                <p id="carrito-comprado" class="carrito-comprado disabled">Muchas gracias por tu compra. <i class="bi bi-emoji-laughing"></i></p>
            </div>
        </main>
    </div>
 
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    
<!-- <script src="./js/carrito.js"></script> -->
<script src="./js/menu.js"></script>

<script>
let productos = [];
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
let bontonAumentar = document.querySelectorAll(".carrito-productoAumentar");

const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector(".carrito-acciones-comprar");





function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                

                <div> 
                  <button class="carrito-productoAumentar" id="${producto.id}"><i class="bi bi-plus-circle"></i></button>
                </div>
                
                <div>  
                  <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-x-circle"></i></button>
                </div>`;

            
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarBotonesAgregar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function actualizarBotonesAgregar(){
    bontonAumentar = document.querySelectorAll(".carrito-productoAumentar");
    bontonAumentar.forEach(boton => {
        boton.addEventListener("click", aumentarCantidad);
    });
}

function aumentarCantidad(e) {
    Toastify({
        text: "Agregando Productos",
        duration: 3000,
        // close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    // productosEnCarrito.splice(index, 1);Quita el total de una cantidad
    productosEnCarrito[index].cantidad++;
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        // close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    // productosEnCarrito.splice(index, 1);Quita el total de una cantidad
    productosEnCarrito[index].cantidad--;
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
      })
}


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    let totalwasap = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

    let mensajecreado = "Productos en el chango: \n";

    mensajecreado += productosEnCarrito.reduce((acc, producto, index) => {
        return acc + (index + 1) + ". " + producto.titulo + " - " + producto.cantidad + " unidad(es) - $" + producto.precio + " - $" + (producto.precio * producto.cantidad) + "\n";
    }, "");

    let mensajefinal = mensajecreado.concat(`\nTotal:$${totalwasap}`);
    window.open(`https://wa.me/2804?text=${encodeURIComponent(mensajefinal)}`);


    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}

</script>

</body>
</html>