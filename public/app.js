
const obtenerDatosServidor = async (param = 'completa')=>{
    try {
        const resp  = await fetch(`https://bsaleserver.herokuapp.com/${param}`);
        if (!resp.ok) throw ('no fue posible cargar los datos');
        return  await resp.json();
    } catch (error) {
        console.log('Error '+error);
    }
}

const card  = document.getElementById('cardProducto');
const inputBuscador=document.getElementById('inputBuscador');
const carro = document.getElementById('carroCompras');
const total = document.getElementById('total');

const botonVaciarCarro = document.getElementById('boton-vaciar');
let data = '';
let carroArray =[];
let totalCarro=0;
    
const mostrarProductos =    (productos)=>{
        // this.data = '';
        // this.data = productos;
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

            //Insertar al DOM
            nodo.appendChild(nodoImage)
            nodoBody.appendChild(nodoName);
            nodoBody.appendChild(nodoPrice);
            nodoPrice.appendChild(nodoButtonUp);
            nodoButtonUp.appendChild(nodoButtonUpIcon);
            nodo.appendChild(nodoBody);
            card.appendChild(nodo);
        }    
}
 function agregarCarro (){
    carroArray.push(this.getAttribute('marcador'));
    calcularTotal();
    renderCarro();
    
};


const renderCarro =  ()=>{
    carro.textContent = '';
    let carroUnico = [... new Set(carroArray)];
    carroUnico.forEach( (producto, index) =>{
        let miProducto = this.data.filter((data)=>{
            return data['id']==producto
        })
        let cantidadProducto = carroArray.reduce((total, productId)=>productId===producto?total+=1:total ,0);
        
        let nodo = document.createElement('li');
        nodo.classList.add('list-group-item','text-right', 'mx-2');
        nodo.textContent = `${cantidadProducto} x ${miProducto[0]['name']} - $ ${miProducto[0]['discountPrice']}`
        
        let botonBorrar = document.createElement('button');
        botonBorrar.classList.add('btn', 'btn-danger', 'mx-5');
        botonBorrar.textContent = 'X';
        botonBorrar.style.marginLeft = '1rem';
        botonBorrar.setAttribute('producto', producto);
        botonBorrar.addEventListener('click', borrarProductoCarro);

        nodo.appendChild(botonBorrar);
        carro.appendChild(nodo); 
    });
}
function borrarProductoCarro(){

    let id = this.getAttribute('producto');

    carroArray = carroArray.filter( (productoName)=> {
         return productoName !== id;
     });

     renderCarro();

     calcularTotal();
}

const calcularTotal = async ()=>{
    
    totalCarro = 0;
    for (let producto of carroArray) {
         let miProducto = this.data.filter((data)=>{
            return data['id']==producto;
        })
        totalCarro = totalCarro + miProducto[0]['discountPrice'];

     }
     total.textContent = totalCarro.toFixed(2);
}

const vaciarCarro = ()=>{
    carroArray=[];
    renderCarro();
    calcularTotal();
}
botonVaciarCarro.addEventListener('click',vaciarCarro);



// Muestra todos los productos
const obtenerListaProductos = async()=>{
    this.data=await obtenerDatosServidor()
    mostrarProductos( this.data);
}
//Busqueda por nombre
const busqueda = async(termino)=>{
    mostrarProductos( await obtenerDatosServidor(`busqueda/${termino}`));
}
//RecargarProductos
const recargarLista =async ()=>{
    while (card.firstChild) {
        card.removeChild(card.firstChild);
      }
    mostrarProductos( await obtenerDatosServidor());
}


//Permite buscar tanto apretando la tecla 'enter' como la lupa
const eventoBusqueda = (event)=>{
    if(event &&event.keyCode!='13'){
    }else{
        while (card.firstChild) {
            card.removeChild(card.firstChild);
          }
        busqueda(inputBuscador.value);
    }    
}
//Ejecucion inicial
obtenerListaProductos();
calcularTotal();
renderCarro();


