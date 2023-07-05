import * as React from 'react';
import AppContext from '../context/Context';
import UserContext from '../context/UserContext';
import { useState, useContext,useEffect} from 'react'
import { Numpad } from './Numpad';
import { Products } from './Products';
import { Bmenu } from './menu/Bmenu';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export const Game =  () => {

    const {setAllProducts, allProduct, points,gameFinish}:any = useContext(AppContext)
    const {userData}:any = useContext(UserContext)
    let {serie} = useParams()

    const getData = async()=>{
        try{
            const response = await axios.get(`http://127.0.0.1:5000/${serie}`)
            const data = await response.data.product
            console.log(data)
            setAllProducts(data)
        }catch(err){
            console.log(err)
        }
        
    }

    useEffect(()=>{
        getData() 
      },[])

   

    return(
        
        <div className='game'>
            <Bmenu />
            {allProduct.length > 0 && <Products />}
            <Numpad />
            <div className="result" style={{display: gameFinish ? "flex" : "none"}}>
                <h1>Bravo vous venez de prendre {points} {points > 1 ? "points" :  "point"}</h1>
                <Link to="/"><button>Accueil</button></Link>
                <Link to={userData.isConnecter ? "/profil" : "/login"}><button>Mon compte</button></Link>
            </div>
        </div>
    )
}