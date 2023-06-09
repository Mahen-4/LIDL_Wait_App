import * as React from 'react';
import {useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { passwordVerif } from './PasswordVerif';
import { NavBar } from '../NavBar';
import Axios from 'axios'

export const CreateAccount = ()=> {

    const [errMSG, setErrMSG] = useState("")

    const [validationResult, setValidationResult] = useState<{ [key: number]: boolean }>({})
    const passwordChange = useRef<HTMLInputElement | null>(null)
    const usenameChange = useRef<HTMLInputElement | null>(null)
    const mailChange = useRef<HTMLInputElement | null>(null)
    
    const validationRules = [
        {
            regex: /[a-z]/g,
            message: "Il manque une lettre minuscule",
        },
        {
            regex: /[A-Z]/g,
            message: "Il manque une lettre majuscule",
        },
        {
            regex: /[0-9]/g,
            message: "Il manque un chiffre",
        },
        {
            regex: /[!@#$%^&*(),.?":{}|<>]/g,
            message: "Il manque un symbole",
        },
        {
            conditionVerif: (password: string) => password.length >= 10,
            message: "Mot de passe trop court",
        },
    ]

    const [passwordValide, setPasswordValide] = useState<boolean>(false)

    const sendData = async (event:React.FormEvent) => {
        event.preventDefault() 
        if(passwordChange.current && usenameChange.current && mailChange.current){
            if(passwordChange.current.value === "" || usenameChange.current.value === "" || mailChange.current.value === ""){
                setErrMSG("Tous les champs doivent être remplis")
            }
            else{
                passwordValide  ? Axios.post("http://127.0.0.1:5000/createAcc", {
                    "username": usenameChange.current.value,
                    "mail" : mailChange.current.value,
                    "mdp": passwordChange.current.value
                }).then(response => {setErrMSG(response.data.message)})
                : setErrMSG("Mot de passe invalide")
                
            }
        }
        
    }

    React.useEffect(()=>{    
        !(Object.values(validationResult).indexOf(false) > -1) ? setPasswordValide(true) : setPasswordValide(false)
    },[validationResult])

    return (
      <div className='createAccountPage'>
        <NavBar />
        <h1>Création du compte</h1>
        <form onSubmit={sendData}>
            <input type='text' placeholder='Pseudo' ref={usenameChange}/>     
            <input type='email' placeholder='Email' ref={mailChange}/>    
            <input type='password' placeholder='Mot de passe' onChange={()=> passwordVerif(passwordChange,validationRules,setValidationResult)} ref={passwordChange}/>
            {validationRules.map((rule, index) => (
                <p key={index} style={{ color: validationResult[index] ? "green" : "red", textDecoration: validationResult[index] ? "line-through" : "" }}>
                    {rule.message}
                </p>
            ))}
            <div>
                <button type='submit'>Crée le compte</button>
                <Link to="/login"><p>Se connecter</p></Link>
                <h3>{errMSG}</h3>
            </div>
        </form> 

      </div>
    );
}
