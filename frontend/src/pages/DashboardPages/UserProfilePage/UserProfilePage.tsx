import React, { useState } from 'react'
import styles from './UserProfilePage.module.scss'
import UserProfileEditForm from '../../../components/Forms/UserProfileEditForm/UserProfileEditForm'
import UserPasswordChangeForm from '../../../components/Forms/UserPasswordChangeForm/UserPasswordChangeForm'
import { FaUserEdit, FaUserLock } from 'react-icons/fa'
import useHeader from '../../../hooks/useHeader'

type FilterType = 'editProfile' | 'changePassword'

const UserProfilePage = () => {
  const [filterType, setFilterType] = useState<FilterType>('editProfile')

  useHeader('Twój Profil')

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
