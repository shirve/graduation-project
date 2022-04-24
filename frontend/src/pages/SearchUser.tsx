import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserInfo } from '../models/User'

const SearchUser = () => {
  const [user, setUser] = useState<UserInfo>()
  const { id } = useParams()

  useEffect(() => {
    const getUser = async (userId: string) => {
      const res = await axios.get(`/api/users/user/${userId}`)
      setUser(res.data)
    }

    if (id !== undefined) {
      getUser(id)
    }
  }, [])

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
