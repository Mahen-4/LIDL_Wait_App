
import * as React from 'react';
import { useState, useContext} from 'react'
import clear from '../images/clear.png'
import validate from '../images/validate.png'
import { AppContext } from '../App';
import { Link } from 'react-router-dom';


export const Numpad =  () => {

    

    const {setGuessNum} = useContext(AppContext)
    const [inputNum, setInputNum] = useState(0);
    const [precNum, setPrecNum] = useState([]);
    const [isDecimal, setIsDecimal] = useState(false);
    const [decimalCount, setDecimalCount] = useState(1);
    const [monitor, setMonitor] = useState(0)
    const [decimalDisable, setDecimalDisable] = useState(false)
    const [suppDisable, setSuppDisable] = useState(false)
    const [numDisable, setNumDisable] = useState(false)
    
    // HANDLING DISABLED BUTTON AND DECIMAL
    React.useEffect(()=>{
        precNum.length < 1 ? setSuppDisable(true)   : setSuppDisable(false)
        precNum.length < 1 && setIsDecimal(false)
        decimalCount >= 1 && setIsDecimal(false)
        isDecimal ? setDecimalDisable(true) :  setDecimalDisable(false)
        isDecimal & precNum.length >= 2 ? setNumDisable(true) : setNumDisable(false)
  
    },[precNum.length])

    React.useEffect(()=>{
        setMonitor(inputNum);   
    },[inputNum])
    

    // HANDLING NUM INPUT 12.3
    const takeInputNum = (num) =>{
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
        
        let lastNumber = precNum[precNum.length -1]

        if(decimalCount < 2)
        {
            let tempNum  = inputNum / 10
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
    <div className='numpad'>
        <Link to="/">HOME</Link>
        <section className='monitor'>
            <p className='output'>{monitor}</p>
        </section>
        <section className='keyboard'>
            <div className='keyboard-row'>
                <button className='one-block' disabled={numDisable} onClick={() => {takeInputNum(1)}}>1</button>
                <button className='one-block' disabled={numDisable} onClick={() => {takeInputNum(2)}}>2</button>
                <button className='one-block' disabled={numDisable} onClick={() => {takeInputNum(3)}}>3</button>
                <button className='one-block pointBtn'>0</button>
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
