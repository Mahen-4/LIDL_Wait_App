
import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
import UserContext from '../context/UserContext';

export const Home =  () => {

    const {userData, setUserData}:any = React.useContext(UserContext)

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