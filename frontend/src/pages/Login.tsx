import React, { useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { alertReset, loginUser } from '../features/auth/authSlice'
import FormField from '../components/common/FormField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '../app/store'
import { useAppDispatch } from '../app/store'
import { LoginFormFields } from '../data/auth/LoginFormFields'
import Spinner from '../components/common/Spinner'
import Alert from '../components/common/Alert'
import AlertContext from '../context/alert/AlertContext'
import HeaderContext from '../context/header/HeaderContext'

function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { setAlert, removeAlert } = useContext(AlertContext)
  const { setHeader } = useContext(HeaderContext)

  const { user, success, loading, alert } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    setHeader('ZALOGUJ SIĘ')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (success || user) {
      navigate('/')
    }
  }, [user, success])

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

  if (loading) return <Spinner />

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
        <div className='auth'>
          <form className='auth-form' onSubmit={handleSubmit}>
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
                  className={
                    errors[field.name as keyof typeof values] &&
                    touched[field.name as keyof typeof values]
                      ? 'is-invalid'
                      : ''
                  }
                />
                {errors[field.name as keyof typeof values] &&
                  touched[field.name as keyof typeof values] && (
                    <p className='auth-form-error'>
                      {errors[field.name as keyof typeof values]}
                    </p>
                  )}
              </React.Fragment>
            ))}
            <Alert />
            <button
              type='submit'
              disabled={isSubmitting}
              className='auth-form-button'
            >
              Zaloguj
            </button>
          </form>
          <p>
            Nie masz jeszcze konta? <Link to='/register'>Zarejestruj się</Link>
          </p>
        </div>
      )}
    </Formik>
  )
}

export default Login
