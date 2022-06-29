import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../app/store'
import HeaderContext from '../../../context/header/HeaderContext'
import displayAlert from '../../../utils/displayAlert'
import styles from './UserProfilePage.module.scss'
import UserProfileEditForm from '../../../components/Forms/UserProfileEditForm/UserProfileEditForm'
import UserPasswordChangeForm from '../../../components/Forms/UserPasswordChangeForm/UserPasswordChangeForm'
import { FaUserEdit, FaUserLock } from 'react-icons/fa'
import { resetAlert } from '../../../features/users/userSlice'

type FilterType = 'editProfile' | 'changePassword'

const UserProfilePage = () => {
  const [filterType, setFilterType] = useState<FilterType>('editProfile')

  const { setHeader } = useContext(HeaderContext)
  const { alert } = useSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setHeader('TWÓJ PROFIL')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (alert) displayAlert(alert)
    return () => {
      if (alert) dispatch(resetAlert())
    }
  }, [alert])

  const handleFilterChange = (type: FilterType) => {
    switch (type) {
      case 'editProfile':
        setFilterType('editProfile')
        break
      case 'changePassword':
        setFilterType('changePassword')
        break
    }
  }

  return (
    <React.Fragment>
      <ul className={styles.navigation}>
        <li
          className={filterType === 'editProfile' ? styles.active : undefined}
          onClick={() => handleFilterChange('editProfile')}
        >
          <FaUserEdit />
          Edycja profilu
        </li>
        <li
          className={
            filterType === 'changePassword' ? styles.active : undefined
          }
          onClick={() => handleFilterChange('changePassword')}
        >
          <FaUserLock />
          Edycja hasła
        </li>
      </ul>
      <div className={styles.content}>
        {filterType === 'editProfile' && <UserProfileEditForm />}
        {filterType === 'changePassword' && <UserPasswordChangeForm />}
      </div>
    </React.Fragment>
  )
}

export default UserProfilePage
