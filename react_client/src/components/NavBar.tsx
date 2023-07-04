import { Bmenu } from "./menu/Bmenu"
import logo from '../images/logo.png'

export const NavBar = () => {
    return(
        <div className="navbar">
            <Bmenu />
            <img src={logo} alt='' style={{width: "50%"}}/>
        </div>
    )
}