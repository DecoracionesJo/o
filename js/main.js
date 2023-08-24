let productos = [];

//solo carga los elementos html d la cate confg. al entrar al menu de categorias no cambia


//prod lisos para la entr
const linkproductos= 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT3otRMD8hlhfvLimLmINJmy8Rs3ipWe7J0xOLQLZul0LO_ZyFqsrvGt1D5XMOzveYmz5ElPYKq3xOz/pub?gid=571610677&single=true&output=csv'
//demas productos
const linkcamisetas = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT3otRMD8hlhfvLimLmINJmy8Rs3ipWe7J0xOLQLZul0LO_ZyFqsrvGt1D5XMOzveYmz5ElPYKq3xOz/pub?gid=347906132&single=true&output=csv'
const linkpantalones = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT3otRMD8hlhfvLimLmINJmy8Rs3ipWe7J0xOLQLZul0LO_ZyFqsrvGt1D5XMOzveYmz5ElPYKq3xOz/pub?gid=384760008&single=true&output=csv'

llamadaproductos();

function llamadaproductos(){
  axios
  .get(linkproductos
    ,{
      responseType: "blob",
  },)
  .then(response => {
    Papa.parse(response.data, {
      header: true,
      complete: results => {
        productos = results.data;
        filtroProductosListosParaLaEnrega(productos); //antes cargarProductos(productos)
      },
      error: error => {
        console.error(error.message);
      }
    });
  });
}



function filtroProductosListosParaLaEnrega (productos){
  const categoriaDeseada = "productos listos para la entrega";
  const productosFiltrados = productos.filter(producto => producto.categoriaid === categoriaDeseada);
  cargarProductos(productosFiltrados);
} 


/*elementos del dom- html*/
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

/*para que apresca los procutos de una determ catg*/
botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
  aside.classList.remove("aside-visible");
}))/* quita y agrega class active */


function cargarProductos(productosElegidos) {

  contenedorProductos.innerHTML = "";
  /*forEach recorre cada elementos del array */
  productosElegidos.forEach(producto => {

      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
          <img onclick="a()"class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
          <div class="producto-detalles">
              <h3 class="producto-titulo">${producto.titulo}</h3>
              <p class="producto-precio">$${producto.precio}</p>
              <button class="producto-agregar" id="${producto.id}">Agregar</button>
          </div>
      `;
      contenedorProductos.append(div);
  })

  actualizarBotonesAgregar();
}


/* Agregar un detector de eventos a cada botón en la matriz de botones. Cuando se hace clic en el
botón, elimina la clase activa de todos los botones y agrega la clase activa al botón en el que se
hizo clic. */
botonesCategorias.forEach(boton => {
  boton.addEventListener("click", (e) => {

      botonesCategorias.forEach(boton => boton.classList.remove("active"));
      e.currentTarget.classList.add("active");

      // const cateId= productos.find(producto => producto.categoria);
      // const cateNom="";

      if (/* Comprobando si el botón en el que se hizo clic no es el botón "todos". */
      e.currentTarget.id != "todos") {
          /* Es encontrar el producto con la identificación de categoría que coincide con la
          identificación del botón en el que se hizo clic. */
          const productoCategoria = productos.find(producto => producto.categoriaid === e.currentTarget.id);
          console.log(productoCategoria);
          tituloPrincipal.innerText = productoCategoria.categorianombre;
          const productosBoton = productos.filter(producto => producto.categoriaid === e.currentTarget.id);
          cargarProductos(productosBoton);
      } else {
          tituloPrincipal.innerText = "Todos los productos";
          cargarProductos(productos);
      }

  })
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach(boton => {
      boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}



function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        avatar:"https://creazilla-store.fra1.digitaloceanspaces.com/emojis/56260/shopping-cart-emoji-clipart-md.png",
        duration: 3000,
        // close: true, //x al final. cerrar
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
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}