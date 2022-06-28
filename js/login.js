const user = 'coder'
const pass = 'house'

//lugar donde voy a agregar mi template
let log = document.getElementById('login') 

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
    if(sessionStorage.getItem('user')){
    dropDown.querySelectorAll('a')[0].textContent = sessionStorage.getItem('user')
    const clone = dropDown.cloneNode(true)
    log.parentElement.appendChild(clone)
    log.remove()
}
    modal.hide()
}


const loginUser = () => {
    let name = document.getElementById("inputName").value;
    let cont = document.getElementById("inputPassword").value;
    if (name !== "" && cont != "") {
        if (name == user && cont == pass) {
            sessionStorage.setItem("user", user);
            navBarLogin()
        } else {
            alert("usuario o password incorrectos");
        }
    }   
};
