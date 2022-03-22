'use strict'

import Helpers from './helpers.js'

document.addEventListener('DOMContentLoaded', main)

async function main() {
    const mainNav = document.querySelector('.main-nav')
    const navBarToggle = document.querySelector('#navbar-toggle')

    navBarToggle.addEventListener('click', e =>
        mainNav.classList.toggle('active')
    )

    const options = document.querySelectorAll('.main-nav a')
    options.forEach(option => option.addEventListener('click', manageOptions))
    
    const mainClear = document.querySelector('#clear-main')
    mainClear.addEventListener('click', clearMain)


}


/**
* Carga una página en la SPA según el valor de event.target
* @param {Event} event
*/

function manageOptions(event) {
    event.preventDefault()
    const option = event.target.text
    const container = 'main'

    switch (option) {
        case 'Productos':
            Helpers.loadPage('./resources/html/productos.html')
            break
        case 'Blog':
            Helpers.loadPage('./resources/html/blog.html', container)
            break
        case 'Contáctenos':
            loadContact('./resources/html/contactenos.html', container)
            break
        case 'Acerca de...':
            Helpers.loadPage('./resources/html/acerca-de.html', container)
            break
        case 'Participantes':
            Helpers.loadPage('./resources/html/participantes.html', container)
            break
        default:
            if (option !== 'Inicio') {
                console.log(`No hay definido un caso para la opción ${option}`
                )
            }
            Helpers.loadPage('./resources/html/inicio.html', container)
            break
    }
    document.querySelector('.main-nav').classList.remove('active')
}

function clearMain() {
    document.querySelector('main').innerHTML = ''
}

async function loadContact(url, container){
    await Helpers.loadPage(url, container)

    const events = await Helpers.fetchData('../data/events.json')

    const lstEvents = Helpers.populateSelectList('#event', events, 'code', 'name')

    lstEvents.selectedIndex = 0

    const sendObject = document.querySelector('#send')

    sendObject.addEventListener('click', e =>{
        e.preventDefault()

        let newObject = 
            {
                "name" : document.querySelector('#name').value,
                "lastName": document.querySelector('#last-name').value,
                "email": document.querySelector('#email').value,
                "event": Helpers.selectedItemList('#event') 
            }
        
        console.log(newObject)
    })

}


