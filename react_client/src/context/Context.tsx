
import {createContext} from 'react'

interface ContextType  {
    guessNum: number | null;
    setGuessNum: React.Dispatch<React.SetStateAction<number>>
    allProduct: object[]
    points: number | 0
    setPoints: React.Dispatch<React.SetStateAction<number>>
}

const iContextState = {
   guessNum: 0,
   setGuessNum: () => {},
   allProduct: [],
   points: 0,
   setPoints: () => {}
}

const AppContext = createContext<ContextType | undefined>(iContextState)

export default AppContext