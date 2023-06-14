
import * as React from 'react';
import {FC, useState} from 'react'
import axios from 'axios'
export const Game:FC =  () => {

    // //get all product from backend
    // React.useEffect(()=>{
    //     axios.get("http://127.0.0.1:5000/game_fruit&Legume")
    //     .then((response) => {
    //         console.log(response.data.product[0])
    //     })
    // },[])

    const [inputNum, setInputNum] = useState(0);
    const [calculatedNum, setCalculatedNum] = useState(0);
    const [operator, setoperator] = useState(' ');
    const [isDecimal, setIsDecimal] = useState(false);
    const [decimalCount, setDecimalCount] = useState(1);
    const [monitor, setMonitor] = useState(0)
    
    React.useEffect(()=>{
        setMonitor(inputNum);
    },[inputNum])
    

    // HANDLING NUM INPUT
    const takeInputNum = (num: number) =>{
        if(isDecimal){
            num = num/Math.pow(10,decimalCount)
            setDecimalCount(decimalCount+1)
            setInputNum(parseFloat((inputNum+num).toFixed(decimalCount)))
        }
        else{
            setInputNum(inputNum*10+num)
        }
        
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
            </div>
            <div className='keyboard-row'>
                <button className='one-block' value="7" onClick={() => {takeInputNum(7)}}>7</button>
                <button className='one-block' value="8" onClick={() => {takeInputNum(8)}}>8</button>
                <button className='one-block' value="9" onClick={() => {takeInputNum(9)}}>9</button>
            </div>
            <div className='keyboard-row'>
                <button className='one-block' value="0" onClick={() => {takeInputNum(0)}}>0</button>
                <button className='one-block' value="." onClick={() => {setIsDecimal(true)}}>.</button>
                <button className='one-block' value="Supp">Supp</button>
                <button className='one-block' value="=" >=</button>
            </div>
        </section>
    </div>
  );
}
