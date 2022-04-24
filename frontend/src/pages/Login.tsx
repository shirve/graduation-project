import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../features/auth/authSlice'
import FormField from '../components/common/FormField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '../app/store'
import { useAppDispatch } from '../app/store'
import { LoginFormFields } from '../data/auth/LoginFormFields'
import Spinner from '../components/common/Spinner'

function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { user, success, loading, error } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
    if (success || user) {
      navigate('/')
    }
  }, [user, success, error])

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
      onSubmit={(values) => dispatch(login(values))}
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
        <div className='container mt-3 col-xl-4 col-lg-6 col-md-8'>
          <div className='header-title'>Zaloguj się</div>
          <form onSubmit={handleSubmit}>
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
                  className={`form-control input-field ${
                    errors[field.name as keyof typeof values] &&
                    touched[field.name as keyof typeof values] &&
                    'is-invalid'
                  }`}
                />
                {errors[field.name as keyof typeof values] &&
                  touched[field.name as keyof typeof values] && (
                    <div className='invalid-feedback d-flex justify-content-end'>
                      {errors.email}
                    </div>
                  )}
              </React.Fragment>
            ))}
            <div className='d-grid gap-2'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='btn btn-lg mt-3'
              >
                Zaloguj
              </button>
            </div>
          </form>
          <div className='text-center pt-3'>
            Nie masz jeszcze konta? <Link to='/register'>Zarejestruj się</Link>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default Login
