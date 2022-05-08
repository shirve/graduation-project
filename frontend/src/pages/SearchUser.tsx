import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserInfo } from '../models/User'
import Spinner from '../components/common/Spinner'
import Alert from '../components/common/Alert'
import AlertContext from '../context/alert/AlertContext'
import HeaderContext from '../context/header/HeaderContext'

const SearchUser = () => {
  const [user, setUser] = useState<UserInfo>()
  const [loading, setLoading] = useState(true)
  const { userId } = useParams()

  const { setAlert, removeAlert } = useContext(AlertContext)
  const { setHeader } = useContext(HeaderContext)

  useEffect(() => {
    setHeader('PROFIL UŻYTKOWNIKA')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    removeAlert()

    if (userId !== undefined) {
      getUser(userId)
    }

    return () => removeAlert()
  }, [])

  const getUser = async (userId: string) => {
    const res = await axios.get(`/api/users/${userId}`).catch((error) => {
      setAlert(error.response.data.type, error.response.data.message)
      setLoading(false)
    })
    setUser(res?.data)
    setLoading(false)
  }

  if (loading) return <Spinner />

  return (
    <React.Fragment>
      <Alert />
      {user && (
        <div>
          <p>
            {user.firstName}&nbsp;{user.lastName}
          </p>
          <p>{user.email}</p>
        </div>
      )}
    </React.Fragment>
  )
}

export default SearchUser
