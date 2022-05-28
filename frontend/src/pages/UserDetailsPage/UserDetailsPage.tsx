import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserDetailsViewModel } from '../../models/Users/UserDetailsViewModel'
import Spinner from '../../components/common/Spinner/Spinner'
import HeaderContext from '../../context/header/HeaderContext'
import { toast } from 'react-toastify'
import styles from './UserDetailsPage.module.scss'

const UserDetailsPage = () => {
  const [user, setUser] = useState<UserDetailsViewModel>()
  const [loading, setLoading] = useState(true)
  const { userId } = useParams()

  const { setHeader } = useContext(HeaderContext)

  useEffect(() => {
    setHeader('PROFIL UŻYTKOWNIKA')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (userId !== undefined) {
      getUser(userId)
    }
  }, [])

  const getUser = async (userId: string) => {
    const res = await axios.get(`/api/users/${userId}`).catch((error) => {
      toast.error(error.response.data.message)
      setLoading(false)
    })
    setUser(res?.data)
    setLoading(false)
  }

  if (loading) return <Spinner />

  return (
    <React.Fragment>
      {user && (
        <div>
          <div>
            {user.firstName}&nbsp;{user.lastName}
          </div>
          <div>{user.email}</div>
        </div>
      )}
    </React.Fragment>
  )
}

export default UserDetailsPage
