import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import { FaEnvelope, FaKey } from 'react-icons/fa'
import InputField from '../components/common/InputField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { RootState } from '../app/store'
import { useAppDispatch } from '../app/store'

function Login() {
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

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Podany adres e-mail jest niepoprawny')
      .max(255)
      .required('To pole jest wymagane'),
    password: Yup.string().required('To pole jest wymagane'),
  })

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
        <div className='container mt-3 col-xl-4 col-lg-6 col-md-8 p-4'>
          <div className='header-title'>ZALOGUJ SIĘ</div>
          <form onSubmit={handleSubmit}>
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
              icon={<FaKey className='me-3 fs-4' />}
            />
            {errors.password && touched.password && (
              <div className='invalid-feedback d-flex justify-content-end'>
                {errors.password}
              </div>
            )}
            <div className='d-grid gap-2'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='btn btn-lg mt-3'
              >
                ZALOGUJ
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
