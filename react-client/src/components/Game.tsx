
import * as React from 'react';
import {FC} from 'react'
import axios from 'axios'
export const Game:FC =  () => {

    axios.get("http://127.0.0.1:5000/game_fruit&Legume")
    .then((response) => {
        console.log(response.data.product[0])
    })
  return (
    <div>
        <section className='monitor'>
            <p className='output'>0</p>
        </section>
        <section className='keyboard'>
            <div className='keyboard-row'>
                <button className='one-block'>1</button>
                <button className='one-block'>2</button>
                <button className='one-block'>3</button>
            </div>
            <div className='keyboard-row'>
                <button className='one-block'>4</button>
                <button className='one-block'>5</button>
                <button className='one-block'>6</button>
            </div>
            <div className='keyboard-row'>
                <button className='one-block'>7</button>
                <button className='one-block'>8</button>
                <button className='one-block'>9</button>
            </div>
            <div className='keyboard-row'>
                <button className='one-block'>0</button>
                <button className='one-block'>.</button>
                <button className='one-block'>=</button>
            </div>
        </section>
    </div>
  );
}
