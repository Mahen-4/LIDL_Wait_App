
import {createContext} from 'react'

interface ContextType  {
    guessNum: number | null;
    setGuessNum: React.Dispatch<React.SetStateAction<number>>
    allProduct: object[]
    setAllProducts: React.Dispatch<React.SetStateAction<object[]>>
    points: number | 0
    setPoints: React.Dispatch<React.SetStateAction<number>>
}

const iContextState = {
   guessNum: 0,
   setGuessNum: () => {},
   allProduct: [],
   setAllProducts: () => {},
   points: 0,
   setPoints: () => {}
}

const AppContext = createContext<ContextType | undefined>(iContextState)

export default AppContext