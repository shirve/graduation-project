import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { alertReset, registerUser } from '../features/auth/authSlice'
import FormField from '../components/common/FormField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '../app/store'
import { useAppDispatch } from '../app/store'
import { RegisterFormFields } from '../data/auth/RegisterFormFields'
import Spinner from '../components/common/Spinner'
import Alert from '../components/common/Alert'
import AlertContext from '../context/alert/AlertContext'
import HeaderContext from '../context/header/HeaderContext'

function Register() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { setAlert, removeAlert } = useContext(AlertContext)
  const { setHeader } = useContext(HeaderContext)

  const { user, success, loading, alert } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    setHeader('ZAREJESTRUJ SIĘ')
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

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/[a-zA-Z]+/g, 'Imię zawiera niedozwolone znaki')
      .required('To pole jest wymagane'),
    lastName: Yup.string()
      .matches(/[a-zA-Z]+/g, 'Imię zawiera niedozwolone znaki')
      .required('To pole jest wymagane'),
    email: Yup.string()
      .email('Podany adres e-mail jest niepoprawny')
      .max(255)
      .required('To pole jest wymagane'),
    password: Yup.string()
      .min(6, 'Hasło musi zawierać co najmniej 6 znaków')
      .required('To pole jest wymagane'),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Hasła się nie zgadzają')
      .required('To pole jest wymagane'),
  })

  if (loading) return <Spinner />

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
      }}
      onSubmit={(values) => dispatch(registerUser(values))}
      validationSchema={SignUpSchema}
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
            {RegisterFormFields.map((field) => (
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
              Zarejestruj
            </button>
          </form>
          <p>
            Posiadasz już konto? <Link to='/login'>Zaloguj się</Link>
          </p>
        </div>
      )}
    </Formik>
  )
}

export default Register
