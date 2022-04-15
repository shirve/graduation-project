import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import FormField from '../components/common/FormField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '../app/store'
import { useAppDispatch } from '../app/store'
import { RegisterFormFields } from '../data/auth/RegisterFormFields'

function Register() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { user, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

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

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
      }}
      onSubmit={(values) => dispatch(register(values))}
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
        <div className='container mt-3 col-xl-4 col-lg-6 col-md-8'>
          <div className='header-title'>Zarejestruj się</div>
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
            <div className='text-center pt-3'>
              Rejestrując się, zgadzasz się na{' '}
              <Link to='/tos'>Warunki korzystania</Link> {' oraz '}
              <Link to='/privacy'>Politykę prywatności</Link>
            </div>
            <div className='d-grid gap-2'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='btn btn-lg mt-3'
              >
                Zarejestruj
              </button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  )
}

export default Register
