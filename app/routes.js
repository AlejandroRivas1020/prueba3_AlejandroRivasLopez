import { EditFlightScene } from "./scenes/editFlight/editFlight";
import { FlightsScene } from "./scenes/flights/flights.scene";
import { HomeScene } from "./scenes/home/home.scene";
import { LoginScene } from "./scenes/login/login.scene";
import { NotFoundScene } from "./scenes/not-found/not-found.scene";
import { Register } from "./scenes/register/register.scene";
import { ReserveScene } from "./scenes/reservar/reservar.scene";

export const routes = {
    public : [
        {path:'/login',scene:LoginScene},
        {path:'/register',scene:Register},
        {path:'/not-found',scene:NotFoundScene}
    ],
    private:[
        {path:'/home', scene: HomeScene},
        {path:'/reserve',scene:ReserveScene},
        {path:'/flightcreate', scene: FlightsScene},
        {path:'/editFlight',scene:EditFlightScene}
    ]
}