import { useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useAppDispatch } from '../../app/store'
import { loginUser } from '../../features/users/userSlice'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import HeaderContext from '../../context/header/HeaderContext'
import InputField from '../../components/common/Forms/InputField/InputField'
import Button from '../../components/common/Buttons/Button/Button'
import Spinner from '../../components/common/Spinner/Spinner'
import { LoginFormFields } from '../../constants/Auth/LoginFormFields'
import { UserLoginViewModel } from '../../models/Users/UserLoginViewModel'
import styles from './LoginPage.module.scss'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { setHeader } = useContext(HeaderContext)

  const { user, loading, alert } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    setHeader('ZALOGUJ SIĘ')
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
  }, [alert])

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Podany adres e-mail jest niepoprawny')
      .max(255)
      .required('To pole jest wymagane'),
    password: yup.string().required('To pole jest wymagane'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserLoginViewModel>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = (data: UserLoginViewModel) => {
    dispatch(loginUser(data))
  }

  if (loading === 'pending') return <Spinner />

  return (
    <div className={styles.login}>
      <form>
        {LoginFormFields.map((field) => (
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
          Zaloguj
        </Button>
      </form>
      <div>
        Nie masz jeszcze konta? <Link to='/register'>Zarejestruj się</Link>
      </div>
    </div>
  )
}

export default LoginPage
