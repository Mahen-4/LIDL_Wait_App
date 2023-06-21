import * as React from 'react';
import AppContext from '../context/Context';
import { useState, useContext, useEffect} from 'react'
import { handleGuessNum } from './game_fn/HandleGuessNum';
import { generateProduct } from './game_fn/generateProduct';

export const Products =  () => {

    const {guessNum, setGuessNum, allProduct, setPoints, points}:any = useContext(AppContext)
    const [timer, setTimer] = useState<number>(31)
    const [doneProducts, setDoneProducts] = useState<number[]>([])

    const [currentProduct_name, setCurrentProduct_name] = useState<string>("")
    const [currentProduct_price, setCurrentProduct_price] = useState<number>(0)
    const [currentProduct_image, setCurrentProduct_image] = useState<string>("")

    // START
    useEffect(()=>{
        setPoints(0)
        console.log(allProduct)
        generateProduct(doneProducts,allProduct,setDoneProducts,setCurrentProduct_price,setCurrentProduct_name,setCurrentProduct_image)
    },[])

    // when user click validate 
    useEffect(()=>{
        if(guessNum !== 0){
            handleGuessNum(guessNum,currentProduct_price,points,setPoints,setGuessNum, ()=> generateProduct(doneProducts,allProduct,setDoneProducts,setCurrentProduct_price,setCurrentProduct_name,setCurrentProduct_image))
        } 
    },[guessNum])


    // TIMER 
    const timerDown = () => {
        setTimer(timer-1)

       
    }
    setInterval(timerDown,1000)

    
    return(
        <div className='product'>
            <div>
                <h1>{currentProduct_name}</h1>
                <div className='timer'>{timer}</div>
            </div>
            <img src={`https://res.cloudinary.com/dcta12mne/image/upload/v1686749427/produits/${currentProduct_image}.jpg`} alt='' />
            <div className='plus_moins'></div>
        </div>
    )
}