import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import {useState} from 'react'
import './styles/app.scss'
import { Game } from './components/Game';
import AppContext from './context/Context';
import { SeriesMenu } from './components/menu/seriesMenu';
import { Login } from './components/auth/Login';
import { CreateAccount } from './components/auth/CreateAccount';
import { RegleDuJeu } from './components/RegleDuJeu';


function App() {

  const [guessNum, setGuessNum] = useState<number>(0)
  const [points, setPoints] = useState<number>(0)
  const [allProduct, setAllProducts] = useState<object[]>([])
  const [gameFinish, setGameFinish] = useState<boolean>(false)


  return (
    <div className="App">
      <AppContext.Provider value={{guessNum,setGuessNum,allProduct,setAllProducts,points,setPoints,gameFinish,setGameFinish}}>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/series/:serie' element={<Game />}/>
          <Route path='/series' element={<SeriesMenu />} />
          <Route path='/regleDuJeu' element={<RegleDuJeu />} />
          <Route path='/createAccount' element={<CreateAccount />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
