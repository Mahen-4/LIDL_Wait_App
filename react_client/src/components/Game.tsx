import * as React from 'react';
import AppContext from '../context/Context';
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