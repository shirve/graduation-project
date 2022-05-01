import React, { useContext, useEffect } from 'react'
import { useState, useRef } from 'react'
import { createPost } from '../features/posts/postSlice'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../app/store'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import Modal from 'react-modal'
import FormField from './common/FormField'
import { PostFields } from '../data/post/PostFields'
import AlertContext from '../context/alert/AlertContext'

interface IFormModel {
  title: string
  story: string
  gameplay: string
  mechanics: string
  characters: string
  levels: string
  graphics: string
  music: string
  genres: string[]
}

const PostForm = () => {
  const [showForm, setShowForm] = useState<boolean>(false)
  const formikRef = useRef<FormikProps<IFormModel>>(null)

  const { user } = useSelector((state: RootState) => state.auth)
  const { alert } = useSelector((state: RootState) => state.posts)

  const dispatch = useAppDispatch()

  const { setAlert } = useContext(AlertContext)

  useEffect(() => {
    if (alert) {
      setAlert(alert.type, alert.message, 5)
    }
    return () => {}
  }, [alert])

  const showPostForm = () => {
    if (showForm) {
      formikRef.current?.resetForm()
      return setShowForm(false)
    }
    return setShowForm(true)
  }

  const PostFormSchema = Yup.object().shape({
    title: Yup.string().required('To pole jest wymagane'),
    story: Yup.string().required('To pole jest wymagane'),
    gameplay: Yup.string().required('To pole jest wymagane'),
    mechanics: Yup.string().required('To pole jest wymagane'),
    characters: Yup.string().required('To pole jest wymagane'),
    levels: Yup.string().required('To pole jest wymagane'),
    graphics: Yup.string().required('To pole jest wymagane'),
    music: Yup.string().required('To pole jest wymagane'),
    genres: Yup.array().of(Yup.string()),
  })

  return (
    <Formik
      initialValues={{
        title: '',
        story: '',
        gameplay: '',
        mechanics: '',
        characters: '',
        levels: '',
        graphics: '',
        music: '',
        genres: [],
      }}
      onSubmit={(values, { resetForm }) => {
        dispatch(createPost(values))
        resetForm()
        setShowForm(false)
      }}
      validationSchema={PostFormSchema}
      innerRef={formikRef}
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
        <React.Fragment>
          {user && (
            <button className='post-form-button' onClick={showPostForm}>
              NOWA PROPOZYCJA GRY
            </button>
          )}
          <Modal
            appElement={document.getElementById('root') || undefined}
            isOpen={showForm}
            overlayClassName='modal-overlay'
            className='modal-content'
          >
            <form className='post-form' onSubmit={handleSubmit}>
              <header className='post-form-header'>
                <h3>Nowa propozycja gry</h3>
                <button
                  type='button'
                  className='btn-close'
                  onClick={showPostForm}
                ></button>
              </header>
              {PostFields.map((field) => (
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
                    options={field.options}
                    multiple={field.multiple}
                  />
                  {errors[field.name as keyof typeof values] &&
                    touched[field.name as keyof typeof values] && (
                      <p className='post-form-error'>
                        {errors[field.name as keyof typeof values]}
                      </p>
                    )}
                </React.Fragment>
              ))}
              <button
                type='submit'
                disabled={isSubmitting}
                className='post-form-button'
              >
                DODAJ NOWĄ PROPOZYCJĘ GRY
              </button>
            </form>
          </Modal>
        </React.Fragment>
      )}
    </Formik>
  )
}

export default PostForm
