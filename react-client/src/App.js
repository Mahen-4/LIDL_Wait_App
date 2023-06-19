import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  {Numpad}  from './components/Numpad';
import { Home } from './components/Home';
import {useState, createContext} from 'react'
import './styles/app.scss'
import { Game } from './components/Game';

export const AppContext = createContext();

function App() {

  const [guessNum, setGuessNum] = useState(0)

  return (
    <div className="App">
      <AppContext.Provider value={{guessNum,setGuessNum}}>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/game' element={<Game />}/>
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
