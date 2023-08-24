// import React from "react";

let productos = [];


let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

// let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

// let mensaje = "Productos en el chango: \n";
// let mensaje ="Productos en el chango: \n";
// mensaje += productosEnCarrito.reduce((acc, producto, index) => acc + (index + 1) + ". " + producto.titulo + " - $" + producto.precio + "\n", "");




/*funciona:requiere q se actualice la pagin*/
// let total = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
// let mensajecreado = "Productos en el chango: \n";
// mensajecreado += productosEnCarrito.reduce((acc, producto, index) => {
//         return acc + (index + 1) + ". " + producto.titulo + " - " + producto.cantidad + " unidad(es) - $" + producto.precio + " - $" + (producto.precio * producto.cantidad) + "\n";
//     }, ""); 
// let mensajefinal= mensajecreado.concat(`\nTotal:$${total}`);


// for (let i = 0; i < productosEnCarrito.length; i++) {
//     mensaje += (i + 1) + ". " + productosEnCarrito[i].nombre + " - $" + productosEnCarrito[i].precio + "\n"
// };

// const [cart, setCart] = React.useState(JSON.parse(localStorage.getItem("productos-en-carrito")));
// const [mensajefinal, setMensajefinal] = React.useState("");

// React.useEffect(() => {
//     let total = cart.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
//     let mensajecreado = "Productos en el chango: \n";
//     mensajecreado += cart.reduce((acc, producto, index) => {
//         return acc + (index + 1) + ". " + producto.titulo + " - " + producto.cantidad + " unidad(es) - $" + producto.precio + " - $" + (producto.precio * producto.cantidad) + "\n";
//     }, "");
//     setMensajefinal(mensajecreado.concat(`\nTotal:$${total}`));
// }, [cart]);


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
                </div>
                
                
            `;
    
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
    /*
    const idBoton = e.currentTarget.id;: esta línea está asignando el valor del atributo "id" del elemento en el que se ha hecho clic (el botón eliminar) a una variable llamada "idBoton".

    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);: esta línea está utilizando el método "findIndex" de los arreglos para encontrar el índice del elemento en el arreglo "productosEnCarrito" cuyo valor de la propiedad "id" sea igual al valor de la variable "idBoton". El resultado se almacena en una variable llamada "index".

    productosEnCarrito.splice(index, 1);: esta línea está utilizando el método "splice" para eliminar del arreglo "productosEnCarrito" el elemento en la posición "index", y solo ese elemento.

    cargarProductosCarrito();: esta línea está llamando a una función llamada "cargarProductosCarrito" que actualiza la vista de los productos en el carrito.

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));: esta línea está guardando el arreglo actualizado "productosEnCarrito" en el LocalStorage. El método "setItem" toma dos argumentos, el primero es la clave o el nombre con el que se guarda el valor, el segundo es el valor que se guarda, en este caso se esta convirtiendo el arreglo en un string antes de guardarlo.
    */
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
    window.open(`https://wa.me/2804978536?text=${encodeURIComponent(mensajefinal)}`);


    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}



function initPayPalButton() {
    paypal.Buttons({
      style: {
        shape: 'pill',
        color: 'gold',
        layout: 'vertical',
        label: 'pay',
        
      },

      createOrder: function(data, actions) {
        let totalpaypal = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

        return actions.order.create({
          purchase_units: [{"amount":{"currency_code":"USD","value":`${totalpaypal}`}}]
        });
      },

      onApprove: function(data, actions) {
        return actions.order.capture().then(function(orderData) {
          
          // Full available details
          console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

          // Show a success message within this page, e.g.
          const element = document.getElementById('paypal-button-container');
          element.innerHTML = '';
          element.innerHTML = '<h3>¡Gracias por tu pago!</h3>';

          // Or go to another URL:  actions.redirect('thank_you.html');
          
        });
      },

      onError: function(err) {
        console.log(err);
      }
    }).render('#paypal-button-container');
  }
  initPayPalButton();