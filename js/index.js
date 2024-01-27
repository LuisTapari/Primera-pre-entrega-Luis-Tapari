const productos = [
    {
        id: "producto-01",
        titulo: "Beat Type Dance",
        imagen:"./assets/img/BeatTypeDance.jpg",
        categoria: {
            nombre:"Instrumentales",
            id: "instrumentales"
        },
        precio: 30
    },
    {
        id: "producto-02",
        titulo: "Beat Type House",
        imagen:"./assets/img/BeatTypeHouse.jpg",
        categoria: {
            nombre:"Instrumentales",
            id: "instrumentales"
        },
        precio: 30
    },
    {
        id: "producto-03",
        titulo: "BeatTypePop",
        imagen:"./assets/img/BeatTypePop.jpg",
        categoria: {
            nombre:"Instrumentales",
            id: "instrumentales"
        },
        precio: 30
    },
    {
        id: "producto-04",
        titulo: "Beat Type Rap",
        imagen:"./assets/img/BeatTypeRap.jpg",
        categoria: {
            nombre:"Instrumentales",
            id: "instrumentales"
        },
        precio: 30
    },
    {
        id: "producto-05",
        titulo: "Beat Type Regeton",
        imagen:"./assets/img/BeatTypeRegeton.jpg",
        categoria: {
            nombre:"Instrumentales",
            id: "instrumentales"
        },
        precio: 30
    },
    {
        id: "producto-06",
        titulo: "Beat Type Rock",
        imagen:"./assets/img/BeatTypeRock.jpg",
        categoria: {
            nombre:"Instrumentales",
            id: "instrumentales"
        },
        precio: 30
    },
    {
        id: "producto-07",
        titulo: "Master",
        imagen:"./assets/img/Master.jpg",
        categoria: {
            nombre:"Producciones",
            id: "producciones"
        },
        precio: 30
    },
    {
        id: "producto-08",
        titulo: "Promocion",
        imagen:"./assets/img/Promocion.jpg",
        categoria: {
            nombre:"Promociones",
            id: "promociones"
        },
        precio: 30
    },
    {
        id: "producto-09",
        titulo: "Recording",
        imagen:"./assets/img/Recording.jpg",
        categoria: {
            nombre:"Producciones",
            id: "producciones"
        },
        precio: 30
    },
    {
        id: "producto-10",
            titulo: "SoundKit Drums",
        imagen:"./assets/img/SoundKitDrums.jpg",
        categoria: {
            nombre:"Soundkit",
            id: "soundkit"
        },
        precio: 30
    },
    {
        id: "producto-11",
        titulo: "Soundkit Guitar",
        imagen:"./assets/img/SoundKitGuitar.jpg",
        categoria: {
            nombre:"Soundkit",
            id: "soundkit"
        },
        precio: 30
    },
    {
        id: "producto-12",
        titulo: "Soundkit Synthe",
        imagen:"./assets/img/SoundKitSynthe.jpg",
        categoria: {
            nombre:"Soundkit",
            id: "soundkit"
        },
        precio: 30
    },
    {
        id: "producto-13",
        titulo: "Soundkit Viento",
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
}
cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);  
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            console.log(productoCategoria);
        
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
        
    })
});


function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}
let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}



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
    console.log(numerito);
}
