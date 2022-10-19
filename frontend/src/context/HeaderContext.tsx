import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
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
  const [header, setHeader] = useState('')

  useEffect(() => {
    document.title = `Podstawy Tworzenia Gier - ${header}`
  }, [header])

  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      {children}
    </HeaderContext.Provider>
  )
}

export default HeaderContext
