import { navigateTo } from "../../Router";
import styles from './navbarlayout.styles.css'

export function NavbarLayout(pageContent,logic) {
    const root = document.getElementById('root');

    const logOut = `
        <button type="button" id="logout">Logout</button>
    `

    root.innerHTML = `
        <nav class="${styles.nav}">
            <a href="/reserve">Reservar</a>
            ${logOut}
        </nav>
        ${pageContent};
    `
    logic();   

    const $logoutButton = root.querySelector('#logout');
    $logoutButton.addEventListener('click',() =>{
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigateTo('/login');
    })
}