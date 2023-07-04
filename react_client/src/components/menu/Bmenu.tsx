import { useState,useContext} from "react"
import home from '../../images/home.png'
import profil from '../../images/profil.png'
import { Link } from "react-router-dom"
import UserContext from "../../context/UserContext"

export const Bmenu =  () => {
    const {userData, setUserData}:any = useContext(UserContext)

    const [menuClicked, setMenuClicked] = useState<boolean>(false)

    const handleClick = () => {
        menuClicked ? setMenuClicked(false) : setMenuClicked(true)
        document.getElementsByClassName("burger")[0].classList.toggle("bActive") 
    }

    
    return(
        <div>
            <div className="bMenu" onClick={handleClick}></div>
            <div className="burger" style={{height: menuClicked ? "235px" : "0px"}}>
                <div className="menu" style={{opacity: menuClicked ? "1" : "0" }}>
                    <ul>
                        <Link to="/"><li><img src={home} alt="" />Home</li></Link>
                        <Link to={userData.isConnecter ? "/profil" : "/login"}><li><img src={profil} alt="" />Profil</li></Link>
                    </ul>  
                </div>
            </div>
        </div>   
    )
}