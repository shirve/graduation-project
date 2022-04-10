import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUser, reset } from '../features/users/userSlice'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../app/store'

const LookupUserProfile = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const { user, isError, message } = useSelector(
    (state: RootState) => state.lookupUser
  )

  useEffect(() => {
    if (id) {
      dispatch(getUser(id))
    }
    if (isError) {
      console.log(message)
    }

    return () => {
      dispatch(reset())
    }
  }, [])

  return (
    <>
      <div>
        {user.firstName}&nbsp;{user.lastName}
      </div>
      <div>{user.email}</div>
    </>
  )
}

export default LookupUserProfile
