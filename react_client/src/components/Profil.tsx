import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { NavBar } from './NavBar';
import { Link } from 'react-router-dom';

export const Profil = () => {

    const {userData,setUserData}:any = useContext(UserContext)

    const deco = () => {
        setUserData({isConnecter: false, username: null, userMail: null, userPoints: 0});
    }

    return(
        <div className='profil'>
            <NavBar />
            <div style={{marginTop: "30%", textAlign: "center"}}>
                <h1>Pseudo : {userData.username}</h1>
                <p>mail : {userData.userMail}</p>
                <h2>Points: {userData.userPoints}</h2>
                <Link to='/login'><button onClick={deco}>deco</button></Link>
            </div>
            
        </div>
    )
}