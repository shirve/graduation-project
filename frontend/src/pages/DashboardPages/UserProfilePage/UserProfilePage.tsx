import React, { useContext, useEffect, useState } from 'react'
import HeaderContext from '../../../context/header/HeaderContext'
import styles from './UserProfilePage.module.scss'
import UserProfileEditForm from '../../../components/Forms/UserProfileEditForm/UserProfileEditForm'
import UserPasswordChangeForm from '../../../components/Forms/UserPasswordChangeForm/UserPasswordChangeForm'
import { FaUserEdit, FaUserLock } from 'react-icons/fa'

type FilterType = 'editProfile' | 'changePassword'

const UserProfilePage = () => {
  const [filterType, setFilterType] = useState<FilterType>('editProfile')

  const { setHeader } = useContext(HeaderContext)

  useEffect(() => {
    setHeader('TWÓJ PROFIL')
    return () => {
      setHeader('')
    }
  }, [])

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
          <span className={styles.badge}>
            <FaUserEdit />
          </span>
          Edycja profilu
        </li>
        <li
          className={
            filterType === 'changePassword' ? styles.active : undefined
          }
          onClick={() => handleFilterChange('changePassword')}
        >
          <span className={styles.badge}>
            <FaUserLock />
          </span>
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
