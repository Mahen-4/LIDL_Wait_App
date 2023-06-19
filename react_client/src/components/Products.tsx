import * as React from 'react';
import AppContext from '../context/Context';
import { useState, useContext, useEffect} from 'react'
import axios from 'axios'

export const Products =  () => {

    interface product {
        img: string,
        name: string,
        price: number
    }


    const {guessNum}:any = useContext(AppContext)
    const [allProducts, setAllProducts] = useState<product[]>([])
    let generate:number = 0
    const [doneProducts, setDoneProducts] = useState<number[]>([])

    const [currentProduct_name, setCurrentProduct_name] = useState<string>("")
    const [currentProduct_price, setCurrentProduct_price] = useState<number>(0)
    const [currentProduct_image, setCurrentProduct_image] = useState<string>("")

    //get all product from backend
    useEffect(()=>{
        getData()
    },[])

    const getData = async () =>{
        let response = await axios.get("http://127.0.0.1:5000/game_fruit&Legume")
        let data = await response.data.product
        console.log(allProducts)
        setAllProducts(data)
        game()
    }

    useEffect(()=>{
        if(guessNum != 0){
            handleGuessNum()
        } 
    },[guessNum])

    const handleGuessNum = ()=>{
        if(currentProduct_price == guessNum){
            console.log('WELL DONE !')
        }
    }

    const game = ()=>{
        if(allProducts.length != 0){
            generate = Math.floor(Math.random() * 6);
            console.log(generate)
            console.log(allProducts[generate])
            setDoneProducts(prev => [...prev, generate])
            setCurrentProduct_price(allProducts[generate].price)
            setCurrentProduct_name(allProducts[generate].name)
            setCurrentProduct_image(allProducts[generate].img)
        }
        

    }

    return(
        <div>
            <h1>{currentProduct_name}</h1>
            <img src={`https://res.cloudinary.com/dcta12mne/image/upload/v1686749427/produits/${currentProduct_image}.jpg`} height={50} />
        </div>
    )
}