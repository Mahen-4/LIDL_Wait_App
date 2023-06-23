
import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import { Bmenu } from './Bmenu';

export const SeriesMenu =  () => {
    return(
        <div className='seriesPage'>
            <Bmenu />
            <img src={logo} alt="" />
            <div className='seriesMenu'>
                <h1>Les Series</h1>
                <Link to="/series/game_fruit&Legume"><div className='subSeriesMenu'>Fruits & Légumes</div></Link>
                <Link to="/game"><div className='subSeriesMenu'>Bricolage</div></Link>
            </div>
            
            
        </div>
    )
}