import React from 'react'
import { useRef } from 'react'
import { createPost, updatePost } from '../features/posts/postSlice'
import { Formik, FormikProps, FormikState } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from '../app/store'
import FormField from './common/FormField'
import { PostFields } from '../data/post/PostFields'
import { Post, PostData } from '../models/Post'

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

interface Props {
  post?: Post
  showForm: () => void
}

const PostForm = ({ post, showForm }: Props) => {
  const formikRef = useRef<FormikProps<IFormModel>>(null)

  const dispatch = useAppDispatch()

  const handleSubmit = (
    data: PostData,
    resetForm: (
      nextState?: Partial<FormikState<IFormModel>> | undefined
    ) => void
  ) => {
    if (post) dispatch(updatePost({ postId: post._id, data }))
    if (!post) dispatch(createPost(data))
    resetForm()
    showForm()
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

  const initialValues = {
    title: post ? post.data.title : '',
    story: post ? post.data.story : '',
    gameplay: post ? post.data.gameplay : '',
    mechanics: post ? post.data.mechanics : '',
    characters: post ? post.data.characters : '',
    levels: post ? post.data.levels : '',
    graphics: post ? post.data.graphics : '',
    music: post ? post.data.music : '',
    genres: post ? post.data.genres : [],
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values, resetForm)
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
        <form className='post-form' onSubmit={handleSubmit}>
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
            {post ? 'EDYTUJ PROPOZYCJĘ GRY' : 'DODAJ NOWĄ PROPOZYCJĘ GRY'}
          </button>
          {post && (
            <small>
              *Po edycji post zostanie ponownie przesłany do zatwierdzenia przez
              administratora
            </small>
          )}
        </form>
      )}
    </Formik>
  )
}

export default PostForm
