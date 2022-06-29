
// lugar donde voy a agregar el contenido de los teomplates
const templateCard = document.getElementById('template-card')
const items = document.getElementById('items')
const footer = document.getElementById('footer')

//traigo templates desde el html (importante el .content para no traer el "template")
const temp = document.getElementById('temp').content //pinto los destinos 
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content

//defino un fragmento donde voy a ir agregando mi html
const fragment = new DocumentFragment()


//escucho el clik para pasar datos a la funcion addcaarrito y btnSumRes
templateCard.addEventListener('click', e => addCarrito(e))
items.addEventListener('click',e => btnSumRes(e))


//el carrito 
let carrito = {}


//cargo la funcion al inicio si tengo el carro en el local storage llamo a funcion
document.addEventListener("DOMContentLoaded", () => {
    fetchData()
    if(localStorage.getItem('miCarro')){
        carrito = JSON.parse(localStorage.getItem('miCarro'))
        pintarCarrito()
    }
});


// traigo la info desde en este caso el archivo api.json
const fetchData = async() => {
    try {
        const res = await fetch("../api.json")
        const data = await res.json()
        printCards(data)
    } catch (err) {
        console.log(err)
    }
}

// agrego la info al template en el fragmento y lo pinto en el html mediante el ID 'template-card'
function printCards(data) {
    data.forEach(producto => {
        temp.querySelector('h5').textContent = producto.nombre
        temp.querySelector('img').setAttribute('src', producto.img)
        temp.querySelector('.btn-primary').dataset.id = producto.id
        temp.getElementById('precio').textContent = producto.precio
        const clone = temp.cloneNode(true)
        fragment.appendChild(clone)
    })
    templateCard.appendChild(fragment)
}

// capturo el btn y busco el elemento padre donde tengo toda la info
function addCarrito(e) {
    if (e.target.classList.contains('btn-primary')) {

        reserva(e.target.parentElement)
      
    }
    e.stopPropagation()
}

function reserva(e) {
    const producto = {
            id: e.querySelector('.btn-primary').dataset.id,
            destino: e.querySelector('.card-title').textContent,
            precio: e.querySelector('#precio').textContent,
            noches: 1,
            personas:1,
        }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.noches = carrito[producto.id].noches + 1
        producto.personas 
    }
    carrito[producto.id] = {...producto }
    pintarCarrito()
}

// vuelco la info del 
const pintarCarrito = () =>{
    items.innerHTML= ''
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id //id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.destino 
        templateCarrito.querySelectorAll('span')[0].innerHTML = producto.noches //noches

        templateCarrito.querySelectorAll('.btn-info')[0].dataset.id = producto.id
        templateCarrito.querySelectorAll('.btn-danger')[0].dataset.id = producto.id
        
        templateCarrito.querySelectorAll('.btn-info')[1].dataset.id = producto.id
        templateCarrito.querySelectorAll('.btn-danger')[1].dataset.id = producto.id

        templateCarrito.querySelectorAll('span')[1].textContent = producto.personas //personas
        templateCarrito.querySelectorAll('span')[2].textContent = (producto.noches * producto.precio)*producto.personas //precio final
        
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    });
    items.appendChild(fragment)
    pintarFooter()
    

}   


const pintarFooter = ()=>{
    footer.innerHTML= ''
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Seleccione sus destinos!</th>
        `
        return
    }
    const nPrecio = Object.values(carrito).reduce((acc,{noches,precio,personas}) =>acc+(noches*precio)*personas,0)
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true) 
    fragment.appendChild(clone)
    footer.appendChild(fragment)
   
    let vaciarCarrito = document.querySelector('#vaciar-carrito');
    vaciarCarrito.addEventListener('click',()=>{
        carrito = {}
        localStorage.removeItem('miCarro')
        pintarCarrito()

    })
    localStorage.setItem('miCarro',JSON.stringify(carrito))
}

function btnSumRes(e){

    if (e.target.parentElement.id == 'persona'){
        if (e.target.classList == 'btn btn-info btn-sm'){
            carrito[e.target.dataset.id].personas ++
        }else if (e.target.classList == 'btn btn-danger btn-sm'){
            carrito[e.target.dataset.id].personas --
            if( carrito[e.target.dataset.id].personas === 0){
                delete carrito[e.target.dataset.id]
            }
        }
    }else if(e.target.parentElement.id == 'noche'){
        if (e.target.classList == 'btn btn-info btn-sm'){
            carrito[e.target.dataset.id].noches ++
        }else if (e.target.classList == 'btn btn-danger btn-sm'){
            carrito[e.target.dataset.id].noches --
            if( carrito[e.target.dataset.id].noches === 0){
                delete carrito[e.target.dataset.id]
            }
        }
    }
 
    e.stopPropagation()
    pintarCarrito()
}

