import * as React from 'react';
import { AppContext } from '../App';
import { useState, useContext} from 'react'
import { Numpad } from './Numpad';
import { Products } from './Products';

export const Game =  () => {


    return(
        <div>
            <Products />
            <Numpad />
        </div>
    )
}