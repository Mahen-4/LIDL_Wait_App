
import {useState, createContext} from 'react'

interface ContextType  {
    guessNum: number | null;
    setGuessNum: React.Dispatch<React.SetStateAction<number>>
}

const iContextState = {
   guessNum: 0,
   setGuessNum: () => {}
}

const AppContext = createContext<ContextType | undefined>(iContextState)

export default AppContext