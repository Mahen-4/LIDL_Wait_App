import { useState } from "react"

export const Bmenu =  () => {

    const [menuClicked, setMenuClicked] = useState<boolean>(false)

    const handleClick = () => {
        console.log("test")
        document.getElementsByClassName("burger")[0].classList.toggle("bActive") 
    }

    return(
        <div className="bMenu" >
            <div className="burger" onClick={handleClick}></div>
            <div className="menu">
                <ul>
                    <li>Home</li>
                    <li>Profil</li>
                </ul>  
            </div>
        </div>
        
    )
}