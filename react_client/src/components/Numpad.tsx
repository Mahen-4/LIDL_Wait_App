
import * as React from 'react';
import { useState, useContext} from 'react'
import clear from '../images/clear.png'
import validate from '../images/validate.png'
import AppContext from '../context/Context';


export const Numpad =  () => {

    

    const {setGuessNum, points, guessNum}:any = useContext(AppContext)
    const [inputNum, setInputNum] = useState<number>(0);
    const [precNum, setPrecNum] = useState<number[]>([]);
    const [isDecimal, setIsDecimal] = useState<boolean>(false);
    const [decimalCount, setDecimalCount] = useState<number>(1);
    const [monitor, setMonitor] = useState<number>(0)
    const [decimalDisable, setDecimalDisable] = useState<boolean>(false)
    const [suppDisable, setSuppDisable] = useState<boolean>(false)
    const [numDisable, setNumDisable] = useState<boolean>(false)
    
    // HANDLING DISABLED BUTTON AND DECIMAL
    React.useEffect(()=>{
        
        console.log("DISABLED AND DECIMAL HANDLER---- TRIGGER")
        precNum.length < 1 ? setSuppDisable(true)   : setSuppDisable(false)
        precNum.length < 1 && setIsDecimal(false)
        decimalCount >= 1 && setIsDecimal(false)
        isDecimal ? setDecimalDisable(true) :  setDecimalDisable(false)
        
        isDecimal ? setNumDisable(true) : setNumDisable(false)
  
    },[precNum.length])

    React.useEffect(()=>{
        setMonitor(inputNum); 
    },[inputNum])
    

    // HANDLING NUM INPUT
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
    
    // HANDLE  SUPP
    const deleteNum = () => {

        inputNum < 0 && setInputNum(0)

        let lastNumber:number = precNum[precNum.length -1 ]
        console.log(precNum.length)
        // No decimal number
        if(decimalCount < 2)
        {
            let tempNum:number = inputNum / 10
            setInputNum(parseFloat((tempNum - (lastNumber/10)).toFixed(decimalCount-1)))
            setPrecNum(previousN => previousN.filter(num => num !== lastNumber))
        }
        // decimal number
        else{
            if(lastNumber < 1){
                lastNumber = lastNumber*10
            }
            setDecimalCount(decimalCount - 1)
            setInputNum(parseFloat((inputNum - (lastNumber/10)).toFixed(decimalCount)))
            setPrecNum(previousN => previousN.slice(0.-1))
        }
        if(precNum.length <= 1){setSuppDisable(true)}

    }

  return (
    <div className='numpad'>
        <section className='monitor'>
            <p className='output'>{monitor}</p>
        </section>
        <section className='keyboard'>
            <div className='keyboard-row'>
                <button className='one-block' disabled={numDisable} onClick={() => {takeInputNum(1)}}>1</button>
                <button className='one-block' disabled={numDisable} onClick={() => {takeInputNum(2)}}>2</button>
                <button className='one-block' disabled={numDisable} onClick={() => {takeInputNum(3)}}>3</button>
                <button className='one-block pointBtn'>{points}</button>
            </div>
            <div className='keyboard-row'>
                <button className='one-block' disabled={numDisable} onClick={() => {takeInputNum(4)}}>4</button>
                <button className='one-block' disabled={numDisable} onClick={() => {takeInputNum(5)}}>5</button>
                <button className='one-block' disabled={numDisable} onClick={() => {takeInputNum(6)}}>6</button>
                <button className='one-block validateBtn' onClick={()=> {setGuessNum(inputNum)}} ><img src={validate}/></button>
            </div>
            <div className='keyboard-row'>
                <button className='one-block' disabled={numDisable} onClick={() => {takeInputNum(7)}}>7</button>
                <button className='one-block' disabled={numDisable} onClick={() => {takeInputNum(8)}}>8</button>
                <button className='one-block' disabled={numDisable} onClick={() => {takeInputNum(9)}}>9</button>
                <button className='one-block suppBtn' onClick={deleteNum} disabled={suppDisable}><img src={clear}/></button>

            </div>
            <div className='keyboard-row'>
                <button className='one-block' value="nothing" >`</button>
                <button className='one-block' disabled={numDisable} onClick={() => {takeInputNum(0)}}>0</button>
                <button className='one-block' value="nothing">`</button>
                <button className='one-block'  onClick={() => {setIsDecimal(true)}} disabled={decimalDisable}>.</button>
                
            </div>
        </section>
    </div>
  );
}
