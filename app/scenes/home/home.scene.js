import { navigateTo } from "../../Router";
import styles from './home.styles.css'

export  function HomeScene(){

    const role = localStorage.getItem('role');
    let cardButton;
    let addFlight;
    if(role == "1"){
        addFlight = `<button id="create" class="${styles.btn}">Add Product</button>`;
        cardButton = `
        <button class="edit ${styles.btn}" data-id="edit">Editar</button>
        <button class="delete ${styles.btn}" data-id="delete">Borrar</button>
        `;
    }
    if(role == "0"){
        cardButton = `<button class="reserve ${styles.btn}">Comprar</button>`;
    }

    const pageContent = `
        <div class="${styles.homeContainer}">
            <div class="${styles.header}">
                <h1>Vuelos Actuales</h1>
            </div>
            <div id="flightCards" class="${styles.flightCards}"></div>
            ${addFlight || ''}
        </div>
    `;

const logic = () =>{

    const allFlights = "http://localhost:3000/Flight";
    const loadFlights = async () => {
        const response = await fetch(allFlights);
        const flights = await response.json();
        flights.forEach(flight => {
            appendProductToList(flight);
        });
        addEventListeners();
    };

    const appendProductToList = (flight) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="${styles.card}">
                <div class="info">
                    <h3>Numero de vuelo:${flight.number}</h3>
                    <p>Origen: ${flight.origin}</p>
                    <p>Destino: ${flight.destination}</p>
                    <h4>Fecha Inicio: ${flight.departure}</h4>
                    <h4>Fecha Regreso: ${flight.arrival}</h4>
                    <h5>Cantidad: ${flight.capacity}<h5><br>
                </div>
                <div class="buttons">
                    ${cardButton}
                </div>
            </div>
        `   

        const deleteButton = card.querySelector('.delete');
        if (deleteButton) {
            deleteButton.setAttribute('data-id', flight.id);
        }

        const editbutton = card.querySelector('.edit');
        if (editbutton) {
            editbutton.setAttribute('data-id', flight.id);
        }
        document.getElementById("flightCards").appendChild(card);
    };


    const addEventListeners = () => {
        if(role == "0"){
            const $buttonReserve = document.querySelectorAll('.reserve');
            $buttonReserve.forEach(button => {
                button.addEventListener('click', (e) => {
                    const card = e.target.closest('.card');
                    const number = e.target.getAttribute('data-id');
                    const origin = card.querySelector('p').textContent;
                    const destination = card.querySelector('p').textContent;
                    const departure = card.querySelector('h4').textContent;
                    const arrival = card.querySelector('h4').textContent;
                    const capacity = card.querySelector('h5').textContent;

                    // Crear la información del producto
                    const productInfo = { number, origin, destination, departure, arrival, capacity };
                    sessionStorage.setItem('productInfo', JSON.stringify(productInfo));

                    // Navegar a la página de orden
                    navigateTo('/home');
                });
            });
        }
        if(role == "1"){
            const $buttonEdit = document.querySelectorAll('.edit');
            const $buttonDelete = document.querySelectorAll('.delete');
            const $buttonCreate = document.querySelector('#create');
            
            $buttonEdit.forEach(button => {
                button.addEventListener('click', (e) => {
                    const card = e.target.closest('.card');
                    const number = e.target.getAttribute('data-id');
                    const origin = card.querySelector('p').textContent;
                    const destination = card.querySelector('p').textContent;
                    const departure = card.querySelector('h4').textContent;
                    const arrival = card.querySelector('h4').textContent;
                    const capacity = card.querySelector('h5').textContent;

                    const productInfo = { number, origin, destination, departure, arrival ,capacity};
                    sessionStorage.setItem('productInfo', JSON.stringify(productInfo));
                    
                    navigateTo('/editFlight');
                });
            });

            $buttonDelete.forEach(button => {
                button.addEventListener('click', async (e) => {
                    const id = e.target.getAttribute('data-id');
                    const confirmed = confirm(`¿Estás seguro de que deseas eliminar el producto "${id}"?`);
                    if (confirmed) {
                        const response = await fetch(`http://localhost:3000/Flight/${id}`, {
                            method: 'DELETE',
                        });
                        if(response.ok){
                            const card = button.closest('.card'); // Obtener la tarjeta asociada al botón
                            if (card) {
                                card.remove(); // Eliminar la tarjeta del DOM
                            }
                        }
                    }
                });
            });
            

            $buttonCreate.addEventListener('click', () => {
                navigateTo('/flightcreate');
            });
        }
    };

    loadFlights()
}
return{
    pageContent,
    logic
}
}