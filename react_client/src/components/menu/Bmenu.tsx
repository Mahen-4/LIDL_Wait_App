import { useState } from "react"
import home from '../../images/home.png'
import profil from '../../images/profil.png'
import { Link } from "react-router-dom"

export const Bmenu =  () => {

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
                        <Link to="/"><li><img src={profil} alt="" />Profil</li></Link>
                    </ul>  
                </div>
            </div>
        </div>   
    )
}