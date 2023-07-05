import { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { NavBar } from './NavBar';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { iUserData } from '../context/UserContext';
export const Profil = () => {

    const {userData,setUserData}:any = useContext(UserContext)

    const deco = () => {
        setUserData({isConnecter: false, username: null, userMail: null, userPoints: 0});
    }
    useEffect(()=>{
        Axios.post("http://127.0.0.1:5000/getInfo", {"mail": userData.userMail})
        .then(response => {
            if(response.data.userData){
                const data = response.data.userData
                setUserData((prevData:iUserData) => ({
                    ...prevData,
                    username: data.username,
                    userMail: data.mail,
                    userPoints: data.points

                }))
            }
            
        })
    },[])
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