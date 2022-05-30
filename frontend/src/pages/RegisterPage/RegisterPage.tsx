import { useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useAppDispatch } from '../../app/store'
import { alertReset, registerUser } from '../../features/users/userSlice'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import HeaderContext from '../../context/header/HeaderContext'
import InputField from '../../components/common/Forms/InputField/InputField'
import Spinner from '../../components/common/Spinner/Spinner'
import Button from '../../components/common/Buttons/Button/Button'
import { RegisterFormFields } from '../../constants/Auth/RegisterFormFields'
import { UserRegisterViewModel } from '../../models/Users/UserRegisterViewModel'
import styles from './RegisterPage.module.scss'

const RegisterPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { setHeader } = useContext(HeaderContext)

  const { user, loading, alert } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    setHeader('ZAREJESTRUJ SIĘ')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (loading === 'fulfilled' || user) {
      navigate('/')
    }
  }, [user, loading])

  useEffect(() => {
    if (alert?.type === 'error') {
      toast.error(alert.message)
    }
    return () => {
      dispatch(alertReset())
    }
  }, [alert])

  const registerSchema = yup.object().shape({
    firstName: yup
      .string()
      .matches(/[a-zA-Z]+/g, 'Imię zawiera niedozwolone znaki')
      .required('To pole jest wymagane'),
    lastName: yup
      .string()
      .matches(/[a-zA-Z]+/g, 'Nazwisko zawiera niedozwolone znaki')
      .required('To pole jest wymagane'),
    email: yup
      .string()
      .email('Podany adres e-mail jest niepoprawny')
      .max(255)
      .required('To pole jest wymagane'),
    password: yup
      .string()
      .min(6, 'Hasło musi zawierać co najmniej 6 znaków')
      .required('To pole jest wymagane'),
    password2: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Hasła się nie zgadzają')
      .required('To pole jest wymagane'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterViewModel>({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = (data: UserRegisterViewModel) => {
    dispatch(registerUser(data))
  }

  if (loading === 'pending') return <Spinner />

  return (
    <div className={styles.register}>
      <form>
        {RegisterFormFields.map((field) => (
          <InputField
            key={field.name}
            register={register}
            errors={errors}
            name={field.name}
            label={field.label}
            type={field.type}
            marginTop={'0.5rem'}
          />
        ))}
        <Button
          type={'submit'}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          width={'100%'}
        >
          Zarejestruj
        </Button>
      </form>
      <div>
        Posiadasz już konto? <Link to='/login'>Zaloguj się</Link>
      </div>
    </div>
  )
}

export default RegisterPage
