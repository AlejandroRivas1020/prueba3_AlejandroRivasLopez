import { navigateTo } from "../../Router";
import { FetchApi } from "../../helpers/fetchApi";
import styles from './flights.styles.css'

export function FlightsScene (){
const pageContent =`
        <form class="${styles.form}">
            <label for="flightNumber">Flight Number: </label>
            <input type = "text" id="flightNumber" placeholder ="123422" required maxlength="20" />

            <label for="origin">Origin: </label>
            <input type = "text" id="origin" placeholder ="City" required maxlength="50" />

            <label for="destination">Destination: </label>
            <input type = "text" id="destination" placeholder ="City" required maxlength="50" />

            <label for="departure">Departure: </label>            
            <input type = "date" id="departure" placeholder ="YYYY-MM-DD"  />

            <label for="arrival">Arrival: </label>            
            <input type = "date" id="arrival" placeholder ="YYYY-MM-DD"  />

            <label for="capacity">Capacity: </label>            
            <input type = "text" id="capacity" placeholder ="0000"  />

            <button type ="submit"id="button-flights">Send</button>
        </form>
    `;

    const logic = () =>{

        const $flightNumber = document.getElementById("flightNumber")
        const $origin = document.getElementById("origin")
        const $destination = document.getElementById("destination")
        const $departure = document.getElementById("departure")
        const $arrival = document.getElementById("arrival")
        const $capacity = document.getElementById("capacity")
        const $formFlights = document.getElementById("button-flights")
        
    
        $formFlights.addEventListener("click", async (event)=>{
            event.preventDefault();
    
            const response = await FetchApi('http://localhost:3000/Flight',{
                method:'POST',
                Headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    number:$flightNumber.value,
                    origin:$origin.value,
                    destination:$destination.value,
                    departure:$departure.value,
                    arrival:$arrival.value,
                    capacity:$capacity.value
    
                })
    
            })
            
            if (response) {
                alert('Vuelo creado con éxito')
                navigateTo('/home')
            }
        })
            
    }
    return{
        pageContent,
        logic
    }
        
}