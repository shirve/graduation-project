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
    firstName: yup
      .string()
      .matches(/^[A-ZĄĆĘŁŃÓŚŹŻ]/, 'Imię musi zaczynać się z dużej litery')
      .matches(/^\S+$/, 'Imię nie może zawierać przerw')
      .matches(
        /^.[a-ząćęłńóśźż]*$/,
        'Imię nie może zawierać dużych liter w środku'
      )
      .min(3, 'Imię musi mieć minimum 3 znaki')
      .max(50, 'Imię może mieć maksimum 50 znaków')
      .required('To pole jest wymagane'),
    lastName: yup
      .string()
      .matches(/^[A-ZĄĆĘŁŃÓŚŹŻ]/, 'Nazwisko musi zaczynać się z dużej litery')
      .matches(/^\S+$/, 'Nazwisko nie może zawierać przerw')
      .matches(
        /^.[a-ząćęłńóśźż]*$/,
        'Nazwisko nie może zawierać dużych liter w środku'
      )
      .min(3, 'Nazwisko musi mieć minimum 3 znaki')
      .max(50, 'Nazwisko może mieć maksimum 50 znaków')
      .required('To pole jest wymagane'),
    email: yup
      .string()
      .email('Podany adres e-mail jest niepoprawny')
      .max(255)
      .required('To pole jest wymagane'),
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
    reset({ ...user })
  }, [user])

  useEffect(() => {
    if (alert) displayAlert(alert)
  }, [alert])

  const onSubmit = (data: UserDetailsViewModel) => {
    dispatch(updateUser(data))
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
          />
          <InputField
            register={register}
            errors={errors}
            name={'lastName'}
            label={'Nazwisko'}
          />
          <InputField
            register={register}
            errors={errors}
            name={'email'}
            label={'Email'}
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
