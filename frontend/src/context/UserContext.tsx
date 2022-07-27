import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { UserViewModel } from '../models/Users/UserViewModel'

interface IUserContext {
  user: UserViewModel | null
  setUser: Dispatch<SetStateAction<UserViewModel | null>>
}

const UserContext = createContext({} as IUserContext)

export const useUserContext = () => useContext(UserContext)

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<UserViewModel | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
