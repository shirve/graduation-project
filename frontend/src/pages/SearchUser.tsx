import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserInfo } from '../models/User'
import Spinner from '../components/common/Spinner'

const SearchUser = () => {
  const [user, setUser] = useState<UserInfo>()
  const [loading, setLoading] = useState(true)
  const { userId } = useParams()

  useEffect(() => {
    const getUser = async (id: string) => {
      const res = await axios.get(`/api/users/user/${id}`)
      setUser(res.data)
      setLoading(false)
    }
    if (userId !== undefined) {
      getUser(userId)
    }
  }, [])

  if (loading) return <Spinner />

  return (
    <React.Fragment>
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
