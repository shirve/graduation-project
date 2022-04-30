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
import { PostFormFields } from '../data/post/PostFormFields'
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
  tags: string[]
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
    tags: Yup.array().of(Yup.string()),
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
        tags: [],
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
            <div className='d-flex'>
              <button
                onClick={showPostForm}
                className='post-form-button btn flex-fill'
              >
                NOWA PROPOZYCJA GRY
              </button>
            </div>
          )}
          <Modal
            appElement={document.getElementById('root') || undefined}
            isOpen={showForm}
            overlayClassName='modal-overlay'
            className='modal-content'
          >
            <form className='post-form' onSubmit={handleSubmit}>
              <div className='row'>
                <div className='page-header-text-secondary col-10'>
                  Nowa propozycja gry
                </div>
                <div className='col-2 d-flex justify-content-end align-items-center'>
                  <button
                    type='button'
                    className='btn-close'
                    onClick={showPostForm}
                  ></button>
                </div>
              </div>
              {PostFormFields.map((field) => (
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
                    options={field.options}
                    multiple={field.multiple}
                  />
                  {errors[field.name as keyof typeof values] &&
                    touched[field.name as keyof typeof values] && (
                      <div className='invalid-feedback d-flex justify-content-end'>
                        {errors[field.name as keyof typeof values]}
                      </div>
                    )}
                </React.Fragment>
              ))}
              <div className='d-flex justify-content-end gap-2 mt-3'>
                <button type='submit' disabled={isSubmitting} className='btn'>
                  WYŚLIJ
                </button>
              </div>
            </form>
          </Modal>
        </React.Fragment>
      )}
    </Formik>
  )
}

export default PostForm
