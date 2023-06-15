
import * as React from 'react';
import {FC, useState} from 'react'
import axios from 'axios'
import '../styles/app.scss'
import clear from '../images/clear.png'
import validate from '../images/validate.png'


export const Game:FC =  () => {

    // //get all product from backend
    // React.useEffect(()=>{
    //     axios.get("http://127.0.0.1:5000/game_fruit&Legume")
    //     .then((response) => {
    //         console.log(response.data.product[0])
    //     })
    // },[])

    const [inputNum, setInputNum] = useState<number>(0);
    const [precNum, setPrecNum] = useState<number[]>([]);
    const [isDecimal, setIsDecimal] = useState<boolean>(false);
    const [decimalCount, setDecimalCount] = useState<number>(1);
    const [monitor, setMonitor] = useState<number>(0)
    const [decimalDisable, setDecimalDisable] = useState<boolean>(false)
    const [suppDisable, setSuppDisable] = useState<boolean>(false)
    
    React.useEffect(()=>{
        precNum.length < 1 ? setSuppDisable(true)   : setSuppDisable(false)
        precNum.length < 1 && setIsDecimal(false)
        decimalCount >= 1 && setIsDecimal(false)
        isDecimal ? setDecimalDisable(true) :  setDecimalDisable(false)
  
    },[precNum.length])

    React.useEffect(()=>{
        setMonitor(inputNum);      
    },[inputNum])
    

    // HANDLING NUM INPUT 12.3
    const takeInputNum = (num: number) =>{
        setPrecNum(previous => [...previous, num]);
        if(isDecimal){
            num = num/Math.pow(10,decimalCount)
            setDecimalCount(decimalCount+1)
            setInputNum(parseFloat((inputNum+num).toFixed(decimalCount)))
        }
        else{
            setInputNum(inputNum*10+num)
        }
        
    }
    
    const deleteNum = () => {
        
        
        let lastNumber = precNum[precNum.length -1]

        if(decimalCount < 2)
        {
            let tempNum :number = inputNum / 10
            setInputNum(parseFloat((tempNum - (lastNumber/10)).toFixed(decimalCount)))
            setPrecNum(previousN => previousN.filter(num => num !== lastNumber))
        }
        else{
            setDecimalCount(decimalCount - 1)
            setInputNum(parseFloat((inputNum - lastNumber).toFixed(decimalCount)))
            setPrecNum(previousN => previousN.filter(num => num !== lastNumber))
        }
        if(precNum.length <= 1){setSuppDisable(true)}

    }

  return (
    <div>
        <section className='monitor'>
            <p className='output'>{monitor}</p>
        </section>
        <section className='keyboard'>
            <div className='keyboard-row'>
                <button className='one-block' value="1" onClick={() => {takeInputNum(1)}}>1</button>
                <button className='one-block' value="2" onClick={() => {takeInputNum(2)}}>2</button>
                <button className='one-block' value="3" onClick={() => {takeInputNum(3)}}>3</button>
            </div>
            <div className='keyboard-row'>
                <button className='one-block' value="4" onClick={() => {takeInputNum(4)}}>4</button>
                <button className='one-block' value="5" onClick={() => {takeInputNum(5)}}>5</button>
                <button className='one-block' value="6" onClick={() => {takeInputNum(6)}}>6</button>
                <button className='one-block validateBtn' value="=" ><img src={validate}/></button>
            </div>
            <div className='keyboard-row'>
                <button className='one-block' value="7" onClick={() => {takeInputNum(7)}}>7</button>
                <button className='one-block' value="8" onClick={() => {takeInputNum(8)}}>8</button>
                <button className='one-block' value="9" onClick={() => {takeInputNum(9)}}>9</button>
                <button className='one-block suppBtn' value="Supp" onClick={deleteNum} disabled={suppDisable}><img src={clear}/></button>

            </div>
            <div className='keyboard-row'>
                <button className='one-block' value="nothing">`</button>
                <button className='one-block' value="0" onClick={() => {takeInputNum(0)}}>0</button>
                <button className='one-block' value="nothing">`</button>
                <button className='one-block' value="point" onClick={() => {setIsDecimal(true)}} disabled={decimalDisable}>.</button>
                
            </div>
        </section>
    </div>
  );
}
