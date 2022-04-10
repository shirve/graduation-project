import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface IHeaderContext {
  headerText: string
  setHeaderText: Dispatch<SetStateAction<string>>
}

const HeaderContext = createContext({} as IHeaderContext)

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerText, setHeaderText] = useState<string>('')

  return (
    <HeaderContext.Provider value={{ headerText, setHeaderText }}>
      {children}
    </HeaderContext.Provider>
  )
}

export default HeaderContext
