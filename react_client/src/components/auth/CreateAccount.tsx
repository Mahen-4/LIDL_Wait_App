import * as React from 'react';
import {useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { passwordVerif } from './PasswordVerif';
import { NavBar } from '../NavBar';

export const CreateAccount = ()=> {

    const [validationResult, setValidationResult] = useState<{ [key: number]: boolean }>({})
    const passwordChange = useRef<HTMLInputElement | null>(null)

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


    const sendData = () => {

    }

    return (
      <div className='createAccountPage'>
        <NavBar />
        <h1>Création du compte</h1>
        <form>
            <input type='text' placeholder='Pseudo'/>     
            <input type='email' placeholder='Email'/>    
            <input type='password' placeholder='Mot de passe' onChange={()=> passwordVerif(passwordChange,validationRules,setValidationResult)} ref={passwordChange}/>
            {validationRules.map((rule, index) => (
                <p key={index} style={{ color: validationResult[index] ? "green" : "red", textDecoration: validationResult[index] ? "line-through" : "" }}>
                    {rule.message}
                </p>
            ))}
            <div>
                <button onClick={sendData}>Crée le compte</button>
                <Link to="/login"><p>Se connecter</p></Link>
            </div>
           
        </form> 
      </div>
    );
}
