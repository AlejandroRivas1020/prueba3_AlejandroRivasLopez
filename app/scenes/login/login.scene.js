import { navigateTo } from "../../Router";
import { FetchApi } from "../../helpers/fetchApi";
import  styles  from './login.styles.css'

export function LoginScene() {
    const root = document.getElementById('root')
    root.innerHTML=`
            <form class= "${styles.form}">
            <label for="email">Email: </label>
            <input type = "email" id="email" placeholder ="example@example.com" autocomplete="email" />
            <label for="password">Password: </label>
            <input type = "password" id="password" placeholder ="password" autocomplete = "current-password" />
            <button type ="submit">Login</button>
        </form>
    `

    
    
    const $email = root.querySelector('input[type=email]');
    const $password = root.querySelector('input[type=password]');
    const $formLogin = root.getElementsByTagName('form')[0];
    $formLogin.addEventListener('submit', async (event) =>{
        event.preventDefault();

        if (!$email.value || !$password.value) {
            alert("Por favor, rellene todos los campos")
            return;
        }

        const users = await FetchApi('http://localhost:3000/User')
        const user = users.find(user => user.email === $email.value && user.password=== $password.value)
        if (user) {
            const token = Math.random().toString(36).substring(2);
            const role =user.roleId
            localStorage.setItem('token',token);
            localStorage.setItem('role',role)
            navigateTo('/home')
        }else{
            alert('Usuario o contraseña invalido.')
            
        }
    })
    
}