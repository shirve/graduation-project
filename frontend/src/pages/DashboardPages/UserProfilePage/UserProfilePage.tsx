import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../app/store'
import { updateUser } from '../../../features/users/userSlice'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import HeaderContext from '../../../context/header/HeaderContext'
import InputField from '../../../components/common/Forms/InputField/InputField'
import TextareaField from '../../../components/common/Forms/TextareaField/TextareaField'
import Button from '../../../components/common/Buttons/Button/Button'
import displayAlert from '../../../utils/displayAlert'
import { UserDetailsViewModel } from '../../../models/Users/UserDetailsViewModel'
import styles from './UserProfilePage.module.scss'

const UserProfilePage = () => {
  const { setHeader } = useContext(HeaderContext)
  const { user, alert } = useSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setHeader('TWÓJ PROFIL')
    return () => {
      setHeader('')
    }
  }, [])

  const userProfileSchema = yup.object().shape({
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
    resolver: yupResolver(userProfileSchema),
  })

  useEffect(() => {
    if (user) {
      const { _id, roles, ...userData } = user
      reset({ ...userData })
    }
  }, [user])

  useEffect(() => {
    if (alert) displayAlert(alert)
  }, [alert])

  const onSubmit = (data: UserDetailsViewModel) => {
    const { firstName, lastName, email, ...userData } = data
    dispatch(updateUser(userData))
  }

  return (
    <div className={styles.wrapper}>
      <form>
        <div className={styles.card}>
          <div className={styles.header}>Dane personalne</div>
          <InputField
            register={register}
            errors={errors}
            name={'firstName'}
            label={'Imię'}
            disabled
          />
          <InputField
            register={register}
            errors={errors}
            name={'lastName'}
            label={'Nazwisko'}
            disabled
          />
          <InputField
            register={register}
            errors={errors}
            name={'email'}
            label={'Email'}
            disabled
          />
        </div>
        <div className={styles.card}>
          <div className={styles.header}>Dane dodatkowe</div>
          <InputField
            register={register}
            errors={errors}
            name={'github'}
            label={'Github'}
          />
          <TextareaField
            register={register}
            errors={errors}
            name={'technologies'}
            label={'Technologie'}
          />
        </div>
        <Button
          type={'submit'}
          onClick={handleSubmit(onSubmit)}
          width={'100%'}
          height={'40px'}
          marginTop={'1rem'}
          disabled={isSubmitting}
        >
          Aktualizuj
        </Button>
      </form>
    </div>
  )
}

export default UserProfilePage
