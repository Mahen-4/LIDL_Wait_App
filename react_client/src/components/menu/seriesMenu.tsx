
import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import { Bmenu } from './Bmenu';

export const SeriesMenu =  () => {
    return(
        <div className='seriesPage'>
            <img src={logo} alt="" />
            <div className='seriesMenu'>
                <Link to="/"><div className='subSeriesMenu'>Acceuil</div></Link>
                <Link to="/series/game_fruit&Legume"><div className='subSeriesMenu'>Fruits & Légumes</div></Link>
                <Link to="/game"><div className='subSeriesMenu'>Bricolage</div></Link>
            </div>
            
            
        </div>
    )
}