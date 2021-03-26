
const obtenerDatosServidor = async (param = 'completa')=>{
    try {
        const resp  = await fetch(`https://bsaleserver.herokuapp.com/${param}`);
        // const resp  = await fetch(`http://localhost:8080/${param}`);
        if (!resp.ok) throw ('no fue posible cargar los datos');
        return  await resp.json();
    } catch (error) {
        console.log('Error '+error);
    }
}

const card  = document.getElementById('cardProducto');
inputBuscador=document.getElementById('inputBuscador');
carrito = document.getElementById('carroCompras');
// const elementosDOM = ()=>{
    
// }
const mostrarProductos =    (productos)=>{
        for (let producto of productos){
            let nodo = document.createElement('div');
            nodo.classList.add('card');
            
            let nodoImage = document.createElement('img');
            nodoImage.classList.add('imagen');
            nodoImage.setAttribute('src', producto['url_image']||'./assets/img/image-not-found.png')
            
            let nodoBody = document.createElement('div');
            nodoBody.classList.add('card-body');

            let nodoName = document.createElement('h5');
            nodoName.classList.add('card-title');
            nodoName.textContent= producto['name'];

            let nodoPrice = document.createElement('p');
            nodoPrice.classList.add('card-text','border-top', 'text-center', 'font-weight-bold');
            nodoPrice.textContent= '$'+Math.ceil(producto['discountPrice']);

            let nodoButtonUp = document.createElement('button');
            nodoButtonUp.classList.add('btn','p-0');
            nodoButtonUp.setAttribute('marcador', producto['id']);
            nodoButtonUp.addEventListener('click',agregarCarro);

            let nodoButtonUpIcon = document.createElement('i');
            nodoButtonUpIcon.classList.add('fas', 'fa-caret-up')
            
            let nodoButtonDown = document.createElement('button');
            nodoButtonDown.classList.add('btn','p-0');
            nodoButtonDown.setAttribute('marcador', producto['id']);
            nodoButtonDown.addEventListener('click',descontarCarro);

            let nodoButtonDownIcon = document.createElement('i');
            nodoButtonDownIcon.classList.add('fas', 'fa-caret-down')
            
            //Insertar al DOM
            nodo.appendChild(nodoImage)
            nodoBody.appendChild(nodoName);
            nodoBody.appendChild(nodoPrice);
            nodoPrice.appendChild(nodoButtonUp);
            nodoPrice.appendChild(nodoButtonDown);
            nodoButtonUp.appendChild(nodoButtonUpIcon);
            nodoButtonDown.appendChild(nodoButtonDownIcon);
            nodo.appendChild(nodoBody);
            card.appendChild(nodo);
        }    
}
const agregarCarro = ()=>{

};
const descontarCarro = ()=>{

};
// Muestra todos los productos
const obtenerListaProductos = async()=>{
   
    const productos = await obtenerDatosServidor();
    mostrarProductos(productos);
}
//Busqueda por nombre
const busqueda = async(termino)=>{
    const resultadoBusqueda = await obtenerDatosServidor(`busqueda/${termino}`);
    resultadoBusqueda.forEach(mostrarProductos);
}
//RecargarProductos
const recargarLista =async ()=>{
    while (card.firstChild) {
        card.removeChild(card.firstChild);
      }
    const productos = await obtenerDatosServidor();
    productos.forEach(mostrarProductos);
}


//eventoBusqueda
const eventoBusqueda = (event)=>{
    if(event &&event.keyCode!='13'){
    }else{
        while (card.firstChild) {
            card.removeChild(card.firstChild);
          }
        busqueda(inputBuscador.value);
    }    
}
//Evento agregar pedido
const agregarPedido= (pedido)=>{
    console.log(pedido);
}



//  construccion html
const init  = () =>{
    obtenerListaProductos();
    // elementosDOM();
    
    
    
}





// ejecuciones
init();


