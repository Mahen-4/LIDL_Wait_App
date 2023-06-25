import * as React from 'react';
import AppContext from '../context/Context';
import { useState, useContext, useCallback, useEffect} from 'react'
import { Numpad } from './Numpad';
import { Products } from './Products';
import { Bmenu } from './menu/Bmenu';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const Game =  () => {

    const {setAllProducts, allProduct}:any = useContext(AppContext)
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
        </div>
    )
}