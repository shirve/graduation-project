import React, { useEffect } from 'react'
import { useUpdateUser } from '../../../features/users/mutations'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUserContext } from '../../../context/UserContext'
import InputField from '../../common/FormFields/InputField/InputField'
import TextareaField from '../../common/FormFields/TextareaField/TextareaField'
import Button from '../../common/Buttons/Button/Button'
import { UserDetailsViewModel } from '../../../models/Users/UserDetailsViewModel'
import { UserViewModel } from '../../../models/Users/UserViewModel'
import { AlertViewModel } from '../../../models/Alert/AlertViewModel'
import styles from './UserProfileEditForm.module.scss'
import { UserProfileEditFormFields } from '../../../constants/Users/UserProfileEditFormFields'

const UserProfileEditForm = () => {
  const { user, setUser } = useUserContext()

  const { mutate: updateUser } = useUpdateUser({
    onSuccess: (data: { user: UserViewModel; alert: AlertViewModel }) => {
      setUser(data.user)
    },
  })

  const profileEditSchema = yup.object().shape({
    github: yup
      .string()
      .matches(
        /^https:\/\/github.com\/.+/g,
        'Link musi być w formacie https://github.com/[nazwa-użytkownika]'
      )
      .nullable(),
    technologies: yup.string().max(255).nullable(),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserDetailsViewModel>({
    resolver: yupResolver(profileEditSchema),
  })

  useEffect(() => {
    if (user) {
      const { _id, roles, ...userData } = user
      reset({ ...userData })
    }
  }, [user])

  const onSubmit = (data: UserDetailsViewModel) => {
    updateUser(data)
  }

  return (
    <form className={styles.form}>
      {UserProfileEditFormFields.map(({ name, component, label, disabled }) => (
        <React.Fragment key={name}>
          {component === 'input' && (
            <InputField
              register={register}
              errors={errors}
              name={name}
              label={label}
              disabled={disabled}
            />
          )}
          {component === 'textarea' && (
            <TextareaField
              register={register}
              errors={errors}
              name={name}
              label={label}
              disabled={disabled}
            />
          )}
        </React.Fragment>
      ))}
      <Button
        type={'submit'}
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        fullWidth
      >
        Aktualizuj
      </Button>
    </form>
  )
}

export default UserProfileEditForm
