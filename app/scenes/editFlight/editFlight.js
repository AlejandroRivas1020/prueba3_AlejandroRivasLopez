import { navigateTo } from "../../Router";

export function EditFlightScene() {
    const productInfo = JSON.parse(sessionStorage.getItem('productInfo') || '{}');
    const { number, origin, destination, departure, arrival, capacity } = productInfo;

    let  from =origin.split(':')[1];
    let to = destination.split(':')[1];
    let initialDate =  new Date(departure.split(':')[1]).toISOString().split('T')[0];
    let finalDate = new Date(arrival.split(':')[1]).toISOString().split('T')[0];
    let capacityFlight = Number(capacity.split(':')[1]);

    console.log(capacityFlight);

    const pageContent = `
        <div class="editProductContainer">
            <h1>Edit Flight</h1>
            <form id="editFlightForm">
                <label for="id">Vuelo Numero:</label>
                <input type="text" id="id" name="id" value="${number}" disabled><br>
                <label for="description">Origen:</label>
                <input type="text" id="description" name="origin" value="${from}" disabled><br>
                <label for="destination">Destino:</label>
                <input type="text" id="destination" name="destination" value="${to}" disabled><br>
                <label for="departure">Desde:</label>
                <input type="date" id="departure" name="departure" value="${initialDate}" required><br>
                <label for="arrival">Hasta:</label>
                <input type="date" id="arrival" name="arrival" value="${finalDate}" required><br>
                <label for="capacity">capacidad:</label>
                <input type="number" id="capacity" name="capacity" value="${capacityFlight}" disabled><br>
                
                <button type="submit">Save Changes</button>
            </form>
        </div>
    `;

    const logic = () => {
        const form = document.getElementById('editFlightForm');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const updatedFlight = {
                number: form.elements.id.value,
                origin: form.elements.origin.value,
                destination: form.elements.destination.value,
                departure: form.elements.departure.value,
                arrival: form.elements.arrival.value,
                capacity: form.elements.capacity.value
            };

            try {
                const response = await fetch(`http://localhost:3000/Flight/${number}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedFlight)
                });

                if (response.ok) {
                    alert('Modificación realizada con éxito')
                    navigateTo('/home');
                } else {
                    console.error('Error updating product:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating product:', error);
            }
        });
    };

    return {
        pageContent,
        logic
    };
}
