const user = 'coder'
const pass = 'house'

//lugar donde voy a agregar mi template
let log = document.getElementById('login') 

// LogOut
let navbar = document.querySelector('.navbar-expand-lg')
navbar.addEventListener('click',(e)=>{
    e.target.classList.contains('btn-dark')?logOutNavBar():e.stopPropagation()
})
const logOutNavBar = ()=>{
    localStorage.removeItem('user')
    navBarLogin()
    location.reload()
}

//modal 
let logModal = document.querySelector('#staticBackdrop')
let modal = new bootstrap.Modal(logModal)

//template que voy a agregar al navbar (importante el content).
let dropDown = document.getElementById('dropDown').content 



//capturo los clicks en el modal 
logModal.addEventListener('click',e => meLogeo(e))

//si el click es en boton succes hago algo
function meLogeo(e) {
    if(e.target.classList.contains('btn-success')){
    loginUser()
}
}


const navBarLogin = () =>{
    if(localStorage.getItem('user')){
    dropDown.querySelectorAll('a')[0].textContent = localStorage.getItem('user')
    const clone = dropDown.cloneNode(true)
    log.parentElement.appendChild(clone)
    log.remove()
}
    modal.hide()// ocutlo el modal
}


const loginUser = () => {
    let name = document.getElementById("inputName").value;
    let cont = document.getElementById("inputPassword").value;
    if (name !== "" && cont != "") {
        if (name == user && cont == pass) {
            localStorage.setItem("user", user);
            navBarLogin()
        } else {
            swa() // libreria Sweet Alert
        }
    }   
};


const swa = ()=>{
    Swal.fire({
        title: 'Error!',
        position:'top-center',
        text: 'Corrobore Usuario y/o Contraseña ',
        icon: 'question',
        confirmButtonText: 'Ouch',
      })
      
}
document.addEventListener("DOMContentLoaded", () => {
    navBarLogin()
 });
 