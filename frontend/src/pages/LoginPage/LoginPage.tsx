import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUser } from '../../features/users/mutations'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useUserContext } from '../../context/UserContext'
import InputField from '../../components/common/FormFields/InputField/InputField'
import Button from '../../components/common/Buttons/Button/Button'
import Spinner from '../../components/common/Spinner/Spinner'
import { LoginFormFields } from '../../constants/Auth/LoginFormFields'
import { UserLoginViewModel } from '../../models/Users/UserLoginViewModel'
import styles from './LoginPage.module.scss'
import { setAxiosAuthorizationHeaders } from '../../api/AxiosClients'
import { jwtDecode } from '../../utils/jwtDecode'
import useHeader from '../../hooks/useHeader'

const LoginPage = () => {
  useHeader('Zaloguj się')

  const navigate = useNavigate()

  const { user, setUser } = useUserContext()

  const { mutate: loginUser, isLoading } = useLoginUser({
    onSuccess: (data: string) => {
      setAxiosAuthorizationHeaders(data)
      const decodedUser = jwtDecode(data)
      setUser(decodedUser)
    },
  })

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

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
    loginUser(data)
  }

  if (isLoading) return <Spinner />

  return (
    <div className={styles.login}>
      <form className={styles.form}>
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
