import * as React from 'react';
import AppContext from '../context/Context';
import { useState, useContext, useEffect} from 'react'

export const Products =  () => {


    const {guessNum, setGuessNum, allProduct, setPoints, points}:any = useContext(AppContext)
    let generate:number = 0
    const [timer, setTimer] = useState<number>(31)
    const [doneProducts, setDoneProducts] = useState<number[]>([])

    const [currentProduct_name, setCurrentProduct_name] = useState<string>("")
    const [currentProduct_price, setCurrentProduct_price] = useState<number>(0)
    const [currentProduct_image, setCurrentProduct_image] = useState<string>("")

    // START
    useEffect(()=>{
        setPoints(0)
        console.log(allProduct)
        game()
    },[])

    // when user click validate 
    useEffect(()=>{
        if(guessNum !== 0){
            handleGuessNum()
        } 
    },[guessNum])

    const handleGuessNum = ()=>{
    
        document.getElementsByClassName("plus_moins")[0].classList.remove("plus")
        document.getElementsByClassName("plus_moins")[0].classList.remove("moins")
        switch (true) {

            case guessNum === currentProduct_price:
                setPoints(points+1)
                setGuessNum(0)
                game()
                break;

            case guessNum > currentProduct_price:
                document.getElementsByClassName("plus_moins")[0].classList.add("moins")
                break;
            
            case guessNum < currentProduct_price:
                document.getElementsByClassName("plus_moins")[0].classList.add("plus")
                break;

            default:
                break;
        }
    }

     // generate random product -> verif if already guessed -> if not display  product
    const game = ()=>{
        generate = Math.floor(Math.random() * 6);
        if(doneProducts.includes(generate)){
            if(doneProducts.length === allProduct.length){
                console.log("FINISH")
            }
            else{
                game()
            }
        }
        else{
            setDoneProducts(prev => [...prev, generate])
            setCurrentProduct_price(allProduct[generate].price)
            setCurrentProduct_name(allProduct[generate].name)
            setCurrentProduct_image(allProduct[generate].img)
        }
    }


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