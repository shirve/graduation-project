import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import { FaUser, FaEnvelope, FaLock, FaKey } from 'react-icons/fa'
import InputField from '../components/common/InputField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '../app/store'
import { useAppDispatch } from '../app/store'

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
        <div className='container content-wrapper mt-3 col-xl-4 col-lg-6 col-md-8 p-4'>
          <section className='page-header-text-primary'>
            Zarejestruj się
          </section>
          <hr className='mb-4' />
          <section className='form'>
            <form onSubmit={handleSubmit}>
              <InputField
                type='text'
                name='firstName'
                value={values.firstName}
                placeholder='Imię'
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control input-field ${
                  errors.firstName && touched.firstName && 'is-invalid'
                }`}
                icon={<FaUser className='me-3 fs-4' />}
              />
              {errors.firstName && touched.firstName && (
                <div className='invalid-feedback d-flex justify-content-end'>
                  {errors.firstName}
                </div>
              )}
              <InputField
                type='text'
                name='lastName'
                value={values.lastName}
                placeholder='Nazwisko'
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control input-field ${
                  errors.lastName && touched.lastName && 'is-invalid'
                }`}
                icon={<FaUser className='me-3 fs-4' />}
              />
              {errors.lastName && touched.lastName && (
                <div className='invalid-feedback d-flex justify-content-end'>
                  {errors.lastName}
                </div>
              )}
              <InputField
                type='email'
                name='email'
                value={values.email}
                placeholder='Adres e-mail'
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control input-field ${
                  errors.email && touched.email && 'is-invalid'
                }`}
                icon={<FaEnvelope className='me-3 fs-4' />}
              />
              {errors.email && touched.email && (
                <div className='invalid-feedback d-flex justify-content-end'>
                  {errors.email}
                </div>
              )}
              <InputField
                type='password'
                name='password'
                value={values.password}
                placeholder='Hasło'
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control input-field ${
                  errors.password && touched.password && 'is-invalid'
                }`}
                icon={<FaLock className='me-3 fs-4' />}
              />
              {errors.password && touched.password && (
                <div className='invalid-feedback d-flex justify-content-end'>
                  {errors.password}
                </div>
              )}
              <InputField
                type='password'
                name='password2'
                value={values.password2}
                placeholder='Potwierdź hasło'
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control input-field ${
                  errors.password2 && touched.password2 && 'is-invalid'
                }`}
                icon={<FaKey className='me-3 fs-4' />}
              />
              {errors.password2 && touched.password2 && (
                <div className='invalid-feedback d-flex justify-content-end'>
                  {errors.password2}
                </div>
              )}
              <hr className='mt-4' />
              <div className='d-grid gap-2'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='btn btn-lg mt-3'
                >
                  Zarejstruj
                </button>
              </div>
              <div className='text-center pt-3'>
                Rejestrując się, zgadzasz się na{' '}
                <NavLink to='/tos'>Warunki korzystania</NavLink> {' oraz '}
                <NavLink to='/privacy'>Politykę prywatności</NavLink>
              </div>
            </form>
          </section>
        </div>
      )}
    </Formik>
  )
}

export default Register
