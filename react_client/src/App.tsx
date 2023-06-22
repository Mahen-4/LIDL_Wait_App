import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  {Numpad}  from './components/Numpad';
import { Home } from './components/Home';
import {useState, createContext} from 'react'
import './styles/app.scss'
import { Game } from './components/Game';
import AppContext from './context/Context';
import axios from 'axios'
import { SeriesMenu } from './components/menu/seriesMenu';


function App() {

  const [guessNum, setGuessNum] = useState<number>(0)
  const [points, setPoints] = useState<number>(0)
  const [allProduct, setAllProducts] = useState<object[]>([])

  // React.useEffect(()=>{
  //   axios.get("http://127.0.0.1:5000/game_fruit&Legume").then((response)=>{
  //     setAllProducts(response.data.product)
  //   })   
  // },[])

  return (
    <div className="App">
      <AppContext.Provider value={{guessNum,setGuessNum,allProduct,setAllProducts,points,setPoints}}>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/series/:serie' element={<Game />}/>
          <Route path='/series' element={<SeriesMenu />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
