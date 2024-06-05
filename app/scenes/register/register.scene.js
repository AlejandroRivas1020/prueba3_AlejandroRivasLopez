import { navigateTo } from "../../Router";
import { FetchApi } from "../../helpers/fetchApi";
import styles from "./register.styles.css";

export function Register(){
    const root = document.getElementById('root');
    root.innerHTML = `
            <form class= "${styles.form}">
                <label for="name">Name: </label>
                <input type = "text" id="name" placeholder ="john Doe" autocomplete="name" />

                <label for="email">Email: </label>
                <input type = "email" id="email" placeholder ="example@example.com" autocomplete="email" />
                
                <label for="birthday">Birth Date: </label>            
                <input type = "date" id="birthday" placeholder ="YYYY-MM-DD"  />

                <label for="password">Password: </label>
                <input type = "password" id="password" placeholder ="password" autocomplete = "current-password" />
                
                <button type ="submit">Register</button>
            </form>
    `;
    const $name = root.querySelector('input[type="text"]');
    const $email = root.querySelector('input[type="email"]');
    const $birthDate= root.querySelector('input[type="date"]');
    const $password = root.querySelector('input[type="password"]');
    const $formRegister = root.getElementsByTagName('form')[0];

    $formRegister.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!$name.value || !$email.value || !$password.value) {
            alert('Por favor, rellena todos los campos')
        }


        const createUser = await FetchApi('http://localhost:3000/User',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name:$name.value,
                email:$email.value,
                birthdate:$birthDate.value,
                password:$password.value,
                roleId:0        
            })
        })

        if (createUser) {
            alert('Usuario creado con éxito')
            navigateTo('/login')
        }
    });

}