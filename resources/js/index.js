'use strict'

import Helpers from './helpers.js'

let inquiry
let address

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
            loadProducts('./resources/html/productos.html', container)
            break
        case 'Blog':
            loadBlog('./resources/html/blog.html', container)
            break
        case 'Contáctenos':
            loadContact('./resources/html/contactenos.html', container)
            break
        case 'Acerca de...':
            loadAbout('./resources/html/acerca-de.html', container)
            break
        case 'Participantes':
            loadParticipants('./resources/html/participantes.html', container)
            break
        default:
            if (option !== 'Inicio') {
                console.log(`No hay definido un caso para la opción ${option}`
                )
            }
            loadHome('./resources/html/inicio.html', container)
            break
    }
    document.querySelector('.main-nav').classList.remove('active')
}

async function loadHome(url, container) {
    await Helpers.loadPage(url, container)
}

async function loadProducts(url, container) {
    await Helpers.loadPage(url, container)
}

async function loadBlog(url, container) {
    await Helpers.loadPage(url, container)

    inquiry = await Helpers.fetchData('../data/inquiry.json')
    let i = 0
    const length = 5

    const first = document.querySelector('#first')
    const previous = document.querySelector('#previous')
    const next = document.querySelector('#next')
    const last = document.querySelector('#last')



    first.addEventListener('click', () => {
        i = 0
        seeInquiry(i)
        disableButtons(i, length)
    })

    previous.addEventListener('click', () => {
        i -= 1
        seeInquiry(i)
        disableButtons(i, length)
    })

    next.addEventListener('click', () => {
        i += 1
        seeInquiry(i)
        disableButtons(i, length)
    })

    last.addEventListener('click', () => {
        i = length
        seeInquiry(i)
        disableButtons(i, length)
    })

    searchForDni()

}

function seeInquiry(i) {
    document.querySelector('#date-survey').value = inquiry[i].dateSurvey
    document.querySelector('#dni').value = inquiry[i].dni
    document.querySelector('#name').value = inquiry[i].name
    document.querySelector('#numb-children').value = inquiry[i].numbChildren
    document.querySelector('#phone').value = inquiry[i].phone
    document.querySelector('#date-birth').value = inquiry[i].dateBirth
    document.querySelector('#email').value = inquiry[i].email

    document.querySelector('#earnings').value = inquiry[i].earnings

    document.querySelector('#color-house').value = inquiry[i].colorHouse
    document.querySelector('#web-name').value = inquiry[i].webName
    document.querySelector('#issues').value = inquiry[i].issues

    document.querySelector(`#${inquiry[i].tourismOffer}`).checked = true

    inquiry[i].business.forEach(item => {
        document.querySelector(`#${item}`).checked = true
    });


    document.querySelector('#political-leader').value = inquiry[i].politicalLeader
    document.querySelector('#social-leader').value = inquiry[i].socialLeader
    document.querySelector('#cultural-leader').value = inquiry[i].culturalLeader

    document.querySelector('#places').value = inquiry[i].nearbyPlaces
    document.querySelector('#week-party').value = inquiry[i].weekParty
    document.querySelector('#date-party').value = inquiry[i].dateParty
}

function disableButtons(i, length) {

    // first.addEventListener('click', () =>
    //     first.classList.add('disable'),
    //     previous.classList.add('disable')
    // )

    // last.addEventListener('click', () =>
    //     last.classList.add('disable'),
    //     next.classList.add('disable')
    // )

    // document.getElementById('#next').classList.add('disable', i === length)
    // document.getElementById('#last').classList.add('disable', i === length)

    // document.getElementById('#previous').classList.add('disable', i === 0)
    // document.getElementById('#first').classList.add('disable', i === 0)

    // document.getElementById('#first').classList.remove('disable', i !== 0)
    // document.getElementById('#previous').classList.remove('disable', i !== 0)
    // document.getElementById('#next').classList.remove('disable', i !== length)
    // document.getElementById('#last').classList.remove('disable', i !== length)

}

function searchForDni() {
    const query = document.querySelector('#queries')
    const search = document.querySelector('#search')
    let response

    search.addEventListener('click', () => {
        response = inquiry.findIndex(e => e.dni === query.value);
        seeInquiry(response)
    })
}

async function loadAbout(url, container) {
    await Helpers.loadPage(url, container)
}

async function loadParticipants(url, container) {
    await Helpers.loadPage(url, container)

    address = await Helpers.fetchData('../data/colombia.json')

    const departments = [
        ...new Map(
            address.map(
                item => [item['CÓDIGO DANE DEL DEPARTAMENTO'], item]
            )
        ).values()
    ]
    
    fillSelectDepartments(departments)
}

function fillSelectDepartments(departments) {
    const lstDepartments = Helpers.populateSelectList('#department', departments, 'CÓDIGO DANE DEL DEPARTAMENTO', 'DEPARTAMENTO', 'Elija un departamento')
    lstDepartments.addEventListener('change', e => {
        const municipalities = address.filter(
            item => item['CÓDIGO DANE DEL DEPARTAMENTO'] == e.target.value
        ).map(item => item)

        const lstMunicipalities = Helpers.populateSelectList('#city', municipalities, 'CÓDIGO DANE DEL MUNICIPIO', 'MUNICIPIO', 'Elija un municipio')
    })
}

async function loadContact(url, container) {
    await Helpers.loadPage(url, container)

    const events = await Helpers.fetchData('../data/events.json')

    const lstEvents = Helpers.populateSelectList('#event', events, 'code', 'name')

    lstEvents.selectedIndex = 0

    const sendObject = document.querySelector('#send')

    sendObject.addEventListener('click', e => {
        e.preventDefault()

        let newObject =
        {
            "name": document.querySelector('#name').value,
            "lastName": document.querySelector('#last-name').value,
            "email": document.querySelector('#email').value,
            "event": Helpers.selectedItemList('#event')
        }

        console.log(newObject)
    })

}


function clearMain() {
    document.querySelector('main').innerHTML = ''
}