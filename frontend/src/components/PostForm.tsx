import React from 'react'
import { useState, useRef } from 'react'
import { createPost } from '../features/posts/postSlice'
import InputField from './common/InputField'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { FaTimes } from 'react-icons/fa'
import { useAppDispatch } from '../app/store'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import Modal from 'react-modal'
import { PostItemFields } from '../data/post/PostItemFields'

interface IFormModel {
  title: string
  story: string
  gameplay: string
  mechanics: string
  characters: string
  levels: string
  graphics: string
  music: string
}

const PostForm = () => {
  const [showForm, setShowForm] = useState<boolean>(false)
  const formikRef = useRef<FormikProps<IFormModel>>(null)

  const { user } = useSelector((state: RootState) => state.auth)

  const dispatch = useAppDispatch()

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
          <p className='m-0'>
            Przeglądaj pomysły innych studentów z podobnymi zainteresowaniami,
            nawiązuj nowe kontakty i łącz się w grupy projektowe. Opisz swój
            pomysł na projekt w formularzu klikając poniższy przycisk.
          </p>
          <div className='d-flex'>
            <button
              onClick={user && showPostForm}
              className='post-form-button btn flex-fill'
            >
              NOWA PROPOZYCJA GRY
            </button>
          </div>
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
                  <div onClick={showPostForm}>
                    <FaTimes className='close' />
                  </div>
                </div>
              </div>
              {PostItemFields.map((field) => (
                <React.Fragment key={field.name}>
                  <InputField
                    component={field.component}
                    type='text'
                    name={field.name}
                    value={values[field.name as keyof typeof values]}
                    placeholder={field.placeholder}
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
