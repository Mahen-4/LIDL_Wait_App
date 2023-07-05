
import {createContext} from 'react'

export interface iUserData{
    isConnected: boolean,
    username: string | null,
    userMail: string | null,
    userPoints: number
}

interface UserContextType  {
    userData: iUserData
    setUserData: React.Dispatch<React.SetStateAction<iUserData>>

}
const iUserContextState = {
    userData: {
        isConnected: false,
        username: null,
        userMail: null,
        userPoints: 0
    },
    setUserData: () => {}
}

const UserContext = createContext<UserContextType | undefined>(iUserContextState)

export default UserContext