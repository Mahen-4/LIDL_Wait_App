import * as React from 'react';
import {useRef, ChangeEvent, useState} from 'react';
import logo from '../../images/logo.png'
import { Bmenu } from '../menu/Bmenu';
import { SassColor } from 'sass';

export const Login = ()=> {

    interface iComplete {
        complete: boolean,
        color: string,
        text_deco: string
    } 

    const passwordChange = useRef<HTMLInputElement | null>(null)

    const [lowerCase,setLowerCase] = useState<iComplete>({
        complete: false,
        color: "red",
        text_deco : ""
    })
    const [upperCase,setUpperCase] = useState("Il manque une lettres majuscule")
    const [numbers,setNumbers] = useState("Il manque un Chiffre")
    const [symbols,setSymbols] = useState("Il manque un symbols")

    const complete = {
        complete: true,
        color: "green",
        text_deco : "line-through"
    }


    const passwordVerif = (): void => {
        if(passwordChange.current){
            let lowerCase = /[a-z]/g
            let upperCase = /[A-Z]/g
            let numbers = /[0-9]/g
            let symbols = /[!@#$%^&*(),.?":{}|<>]/g

            let password: string = passwordChange.current.value
            if(password.match(lowerCase)){
                setLowerCase({complete: true, color: "green", text_deco: "line-through"})
            }
           
        }
        
    }


    return (
      <div className='loginPage'>
        <Bmenu />
        <img src={logo} />
        <form>
            <input type='text' placeholder='Pseudo'/>     
            <input type='email' placeholder='Email'/>    
            <input type='password' placeholder='Mot de passe' onChange={passwordVerif} ref={passwordChange}/>
            <p style={{color: lowerCase.color, textDecoration: lowerCase.text_deco}}>il manque une lettre miniscule</p>
            <p>{upperCase}</p>
            <p>{numbers}</p>
            <p>{symbols}</p>
            <button>Se connecter</button>  
        </form> 
      </div>
    );
}
