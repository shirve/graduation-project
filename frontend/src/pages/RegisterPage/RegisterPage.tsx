import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { alertReset, registerUser } from '../../features/users/userSlice'
import FormField from '../../components/common/Forms/FormField/FormField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '../../app/store'
import { useAppDispatch } from '../../app/store'
import { RegisterFormFields } from '../../constants/Auth/RegisterFormFields'
import Spinner from '../../components/common/Spinner/Spinner'
import HeaderContext from '../../context/header/HeaderContext'
import Button from '../../components/common/Buttons/Button/Button'
import styles from './RegisterPage.module.scss'
import { toast } from 'react-toastify'

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

  if (loading === 'pending') return <Spinner />

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
        <div className={styles.register}>
          <form onSubmit={handleSubmit}>
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
            <Button
              type={'submit'}
              onClick={handleSubmit}
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
      )}
    </Formik>
  )
}

export default RegisterPage
