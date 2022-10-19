import { useHeaderContext } from '../context/HeaderContext'

const useHeader = (header: string) => {
  const { setHeader } = useHeaderContext()

  setHeader(header)
}

export default useHeader
