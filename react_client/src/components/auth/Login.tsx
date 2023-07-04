import * as React from 'react';
import {useRef, useState} from 'react';
import logo from '../../images/logo.png'
import { Bmenu } from '../menu/Bmenu';
import { Link } from 'react-router-dom';
import { NavBar } from '../NavBar';
import Axios from 'axios'
import UserContext from '../../context/UserContext';

export const Login = ()=> {

    const {userData, setUserData}:any = React.useContext(UserContext)

    const passwordChange = useRef<HTMLInputElement | null>(null)
    const mailChange = useRef<HTMLInputElement | null>(null)
    const [errMSG, setErrMSG] = useState<string>("")
    
    const connexion =  async (event:React.FormEvent) => {
      event.preventDefault()
      setErrMSG("")
      if(passwordChange.current && mailChange.current){
        if(passwordChange.current.value == "" && mailChange.current.value == ""){
          setErrMSG("Tous les champs doivent être remplis")
        }
        else{
          Axios.post("http://127.0.0.1:5000/logIn", {"mail": mailChange.current.value, "password": passwordChange.current.value})
          .then(response => {
            if(response.data.userData){
              const data = response.data.userData
              setUserData({isConnecter: true, username: data.username, userMail: data.mail, userPoints: data.points});
              setErrMSG(`Connexion reussi, Bienvenue ${userData.username}`)
            }
            else{
              setErrMSG(response.data.err)
            }
           
          })
        }
        
      }
    }
    console.log(userData)
    return (
      <div className='loginPage'>
        <NavBar />
        <h1>Connexion</h1>
        <form onSubmit={connexion}> 
            <input type='email' placeholder='Email' ref={mailChange}/>    
            <input type='password' placeholder='Mot de passe' ref={passwordChange}/>
            <div>
                <button type='submit'>Se Connecter</button>
                <Link to="/createAccount"><p>Crée ton compte</p></Link>
            </div>
        </form> 
        <h3>{errMSG}</h3>
      </div>
    );
}
