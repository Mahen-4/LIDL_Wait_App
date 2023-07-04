
import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
import UserContext from '../context/UserContext';
import Axios from 'axios'

export const Home =  () => {

    const {userData, setUserData}:any = React.useContext(UserContext)

    React.useEffect(()=>{
        Axios.get("http://127.0.0.1:5000/sessionUP").then( response => {
          console.log(response)
        })
      },[userData])
    return(
        <div className='homePage'>
            <img src={logo} alt='' />
            <div className='homeMenu'>
                <Link to="/series"><div className='subMenu'>Jouer</div></Link>
                <Link to="/regleDuJeu"><div className='subMenu'>Règle du jeu</div></Link>
                <Link to={userData.isConnecter ? "/profil" : "/login"}><div className='subMenu'>Mon compte</div></Link>
                
            </div>
            
            
        </div>
    )
}