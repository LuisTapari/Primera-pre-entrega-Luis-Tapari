const productos = [
    {
        id: "producto-01",
        titulo: "producto 01",
        imagen:"./assets/img/BeatTypeDance.jpg",
        categoria: {
            nombre:"Instrumentales",
            id: "instrumentales"
        },
        precio: 30
    },
    {
        id: "producto-02",
        titulo: "producto 02",
        imagen:"./assets/img/BeatTypeHouse.jpg",
        categoria: {
            nombre:"Instrumentales",
            id: "instrumentales"
        },
        precio: 30
    },
    {
        id: "producto-03",
        titulo: "producto 03",
        imagen:"./assets/img/BeatTypePop.jpg",
        categoria: {
            nombre:"Instrumentales",
            id: "instrumentales"
        },
        precio: 30
    },
    {
        id: "producto-04",
        titulo: "producto 04",
        imagen:"./assets/img/BeatTypeRap.jpg",
        categoria: {
            nombre:"Instrumentales",
            id: "instrumentales"
        },
        precio: 30
    },
    {
        id: "producto-05",
        titulo: "producto 05",
        imagen:"./assets/img/BeatTypeRegeton.jpg",
        categoria: {
            nombre:"Instrumentales",
            id: "instrumentales"
        },
        precio: 30
    },
    {
        id: "producto-06",
        titulo: "producto 06",
        imagen:"./assets/img/BeatTypeRock.jpg",
        categoria: {
            nombre:"Instrumentales",
            id: "instrumentales"
        },
        precio: 30
    },
    {
        id: "producto-07",
        titulo: "producto 07",
        imagen:"./assets/img/Master.jpg",
        categoria: {
            nombre:"Producciones",
            id: "producciones"
        },
        precio: 30
    },
    {
        id: "producto-08",
        titulo: "producto 08",
        imagen:"./assets/img/Promocion.jpg",
        categoria: {
            nombre:"Promociones",
            id: "promociones"
        },
        precio: 30
    },
    {
        id: "producto-09",
        titulo: "producto 09",
        imagen:"./assets/img/Recording.jpg",
        categoria: {
            nombre:"Producciones",
            id: "producciones"
        },
        precio: 30
    },
    {
        id: "producto-10",
        titulo: "producto 10",
        imagen:"./assets/img/SoundKitDrums.jpg",
        categoria: {
            nombre:"Soundkit",
            id: "soundkit"
        },
        precio: 30
    },
    {
        id: "producto-11",
        titulo: "producto 11",
        imagen:"./assets/img/SoundKitGuitar.jpg",
        categoria: {
            nombre:"Soundkit",
            id: "soundkit"
        },
        precio: 30
    },
    {
        id: "producto-12",
        titulo: "producto 12",
        imagen:"./assets/img/SoundKitSynthe.jpg",
        categoria: {
            nombre:"Soundkit",
            id: "soundkit"
        },
        precio: 30
    },
    {
        id: "producto-13",
        titulo: "producto 13",
        imagen:"./assets/img/SoundKitViento.jpg",
        categoria: {
            nombre:"Soundkit",
            id: "soundkit"
        },
        precio: 30
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML ="";

    productosElegidos.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src= "${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div)
    })
    actualizarBotonesAgregar();
    console.log(botonesAgregar);
}
cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        
        if(e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);  
            tituloPrincipal.innetText = productoCategoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innetText = "Todos los productos";
            cargarProductos(productos);
        }
        
        cargarProductos(productos);
    })
});
console.log(botonesAgregar);

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}
const productosEnCarrito = [];
function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find( producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}
function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}