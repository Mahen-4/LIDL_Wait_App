
import * as React from 'react';
import {useContext, useState} from 'react'
import AppContext from '../context/Context';
import { Link } from 'react-router-dom';

export const Home =  () => {

    const {guessNum}:any = useContext(AppContext)

    console.log(guessNum)
    return(
        <div>
            <Link to="/game">Numpad</Link>
            <h1>{guessNum}</h1>
        </div>
    )
}