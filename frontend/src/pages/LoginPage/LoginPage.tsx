import React, { useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { alertReset, loginUser } from '../../features/user/userSlice'
import FormField from '../../components/common/Forms/FormField/FormField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '../../app/store'
import { useAppDispatch } from '../../app/store'
import { LoginFormFields } from '../../constants/Auth/LoginFormFields'
import Spinner from '../../components/common/Spinner/Spinner'
import Alert from '../../components/common/Alert/Alert'
import AlertContext from '../../context/alert/AlertContext'
import HeaderContext from '../../context/header/HeaderContext'
import styles from './LoginPage.module.scss'
import WideButton from '../../components/common/Buttons/WideButton/WideButton'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { setAlert, removeAlert } = useContext(AlertContext)
  const { setHeader } = useContext(HeaderContext)

  const { user, loading, alert } = useSelector(
    (state: RootState) => state.currentUser
  )

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
    if (alert) {
      setAlert(alert.type, alert.message)
    } else {
      removeAlert()
    }
    return () => {
      if (alert) dispatch(alertReset())
    }
  }, [alert])

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Podany adres e-mail jest niepoprawny')
      .max(255)
      .required('To pole jest wymagane'),
    password: Yup.string().required('To pole jest wymagane'),
  })

  if (loading === 'pending') return <Spinner />

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => dispatch(loginUser(values))}
      validationSchema={SignInSchema}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <div className={styles.login}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {LoginFormFields.map((field) => (
              <React.Fragment key={field.name}>
                <FormField
                  component={field.component}
                  type={field.type}
                  name={field.name}
                  value={values[field.name as keyof typeof values]}
                  label={field.label}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={
                    errors[field.name as keyof typeof values] &&
                    touched[field.name as keyof typeof values]
                      ? true
                      : false
                  }
                />
                {errors[field.name as keyof typeof values] &&
                  touched[field.name as keyof typeof values] && (
                    <div className={styles.error}>
                      {errors[field.name as keyof typeof values]}
                    </div>
                  )}
              </React.Fragment>
            ))}
            <Alert />
            <WideButton type='submit' disabled={isSubmitting}>
              Zaloguj
            </WideButton>
          </form>
          <div>
            Nie masz jeszcze konta? <Link to='/register'>Zarejestruj się</Link>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default LoginPage
