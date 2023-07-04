import * as React from 'react';
import {useRef, useState} from 'react';
import logo from '../../images/logo.png'
import { Bmenu } from '../menu/Bmenu';
import { Link } from 'react-router-dom';
import { NavBar } from '../NavBar';

export const Login = ()=> {

   
    const passwordChange = useRef<HTMLInputElement | null>(null)

    return (
      <div className='loginPage'>
        <NavBar />
        <h1>Connexion</h1>
        <form> 
            <input type='email' placeholder='Email'/>    
            <input type='password' placeholder='Mot de passe' ref={passwordChange}/>
            <div>
                <button>Se connecter</button>
                <Link to="/createAccount"><p>Crée ton compte</p></Link>
            </div>
        </form> 
      </div>
    );
}
