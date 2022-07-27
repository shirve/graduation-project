import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface IHeaderContext {
  header: string
  setHeader: Dispatch<SetStateAction<string>>
}

const HeaderContext = createContext({} as IHeaderContext)

export const useHeaderContext = () => useContext(HeaderContext)

export const HeaderContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [header, setHeader] = useState<string>('')

  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      {children}
    </HeaderContext.Provider>
  )
}

export default HeaderContext
