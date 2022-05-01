import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface IHeaderContext {
  header: string
  setHeader: Dispatch<SetStateAction<string>>
}

const HeaderContext = createContext({} as IHeaderContext)

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [header, setHeader] = useState<string>('')

  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      {children}
    </HeaderContext.Provider>
  )
}

export default HeaderContext
