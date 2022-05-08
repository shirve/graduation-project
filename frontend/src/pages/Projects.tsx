import React, { useContext, useEffect } from 'react'
import HeaderContext from '../context/header/HeaderContext'

const Projects = () => {
  const { setHeader } = useContext(HeaderContext)

  useEffect(() => {
    setHeader('PROJEKTY')
    return () => {
      setHeader('')
    }
  }, [])

  return <div>Projekty</div>
}

export default Projects
