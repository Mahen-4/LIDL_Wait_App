import * as React from 'react';
import AppContext from '../context/Context';
import { useState, useContext, useEffect} from 'react'
import { handleGuessNum } from './game_fn/HandleGuessNum';
import { generateProduct } from './game_fn/generateProduct';
import { timer } from './game_fn/Timer';

export const Products =  () => {

    const {guessNum, setGuessNum, allProduct, setPoints, points}:any = useContext(AppContext)
    const [timerDown, setTimerDown] = useState<number>(30)
    const [doneProducts, setDoneProducts] = useState<number[]>([])
    const [finish, setFinish] = useState<boolean>(false)

    const [currentProduct_name, setCurrentProduct_name] = useState<string>("")
    const [currentProduct_price, setCurrentProduct_price] = useState<number>(0)
    const [currentProduct_image, setCurrentProduct_image] = useState<string>("")


    const generatingProduct = () => {generateProduct(doneProducts,allProduct,setFinish,setDoneProducts,setCurrentProduct_price,setCurrentProduct_name,setCurrentProduct_image)}

    // START
    useEffect(()=>{
        setPoints(0)
        generatingProduct()
        // generateProduct(doneProducts,allProduct,setDoneProducts,setCurrentProduct_price,setCurrentProduct_name,setCurrentProduct_image)
    },[])

    // when user click validate 
    useEffect(()=>{ 
        console.log(guessNum)
        if(guessNum !== 0){
            handleGuessNum(guessNum,currentProduct_price,points,setTimerDown,setPoints,setGuessNum, generatingProduct)
        } 
    },[guessNum])

    const time = () => {
        timer(timerDown,finish,setTimerDown,generatingProduct)
    }

    useEffect(()=>{  
        const interval = setInterval(() => {
            time()
        }, 1000);
        //Clearing the interval
        return () => clearInterval(interval);
    },[timerDown])
    
    return(
        <div className='product'>
            <div className='title_second'>
                <h1>{currentProduct_name}</h1>
                <div className='timer' color="green">---{timerDown}s</div>
            </div>
            <img src={`https://res.cloudinary.com/dcta12mne/image/upload/v1686749427/produits/${currentProduct_image}.jpg`} alt='' />
            <div className='plus_moins'></div>
        </div>
    )
}