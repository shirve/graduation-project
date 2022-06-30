import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../app/store'
import { resetAlert as resetUserAlert } from '../features/users/userSlice'
import { resetAlert as resetPostAlert } from '../features/posts/postSlice'
import { resetAlert as resetProjectAlert } from '../features/projects/projectSlice'
import { AlertViewModel } from '../models/Alert/AlertViewModel'
import displayAlert from './displayAlert'

const AlertContainer = () => {
  const { alert: userAlert } = useSelector((state: RootState) => state.user)
  const { alert: postAlert } = useSelector((state: RootState) => state.posts)
  const { alert: projectAlert } = useSelector(
    (state: RootState) => state.projects
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (userAlert) displayUserAlert(userAlert)
    if (postAlert) displayPostAlert(postAlert)
    if (projectAlert) displayProjectAlert(projectAlert)
  }, [userAlert, postAlert, projectAlert])

  const displayUserAlert = (alert: AlertViewModel) => {
    displayAlert(alert)
    dispatch(resetUserAlert())
  }

  const displayPostAlert = (alert: AlertViewModel) => {
    displayAlert(alert)
    dispatch(resetPostAlert())
  }

  const displayProjectAlert = (alert: AlertViewModel) => {
    displayAlert(alert)
    dispatch(resetProjectAlert())
  }

  return null
}

export default AlertContainer
