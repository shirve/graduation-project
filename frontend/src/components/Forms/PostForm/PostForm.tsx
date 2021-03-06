import React from 'react'
import { useAppDispatch } from '../../../app/store'
import { createPost, updatePost } from '../../../features/posts/postSlice'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Button from '../../common/Buttons/Button/Button'
import InputField from '../../common/FormFields/InputField/InputField'
import TextareaField from '../../common/FormFields/TextareaField/TextareaField'
import SelectField from '../../common/FormFields/SelectField/SelectField'
import { PostFormFields } from '../../../constants/Posts/PostFormFields'
import { PostViewModel } from '../../../models/Posts/PostViewModel'
import { PostDataViewModel } from '../../../models/Posts/PostDataViewModel'
import styles from './PostForm.module.scss'

interface Props {
  post?: PostViewModel
  handleShowModal?: () => void
}

const PostForm = ({ post, handleShowModal }: Props) => {
  const dispatch = useAppDispatch()

  const postSchema = Yup.object().shape({
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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostDataViewModel>({
    resolver: yupResolver(postSchema),
    defaultValues: {
      ...post?.data,
    },
  })

  const onSubmit = (data: PostDataViewModel) => {
    const dataCopy = { ...data, genres: data.genres ?? [] }
    if (post) dispatch(updatePost({ postId: post._id, data: dataCopy }))
    if (!post) dispatch(createPost(dataCopy))
    if (handleShowModal) handleShowModal()
  }

  return (
    <form className={styles.form}>
      {PostFormFields.map(({ name, component, label, options, isMulti }) => (
        <React.Fragment key={name}>
          {component === 'input' && (
            <InputField
              register={register}
              errors={errors}
              name={name}
              label={label}
            />
          )}
          {component === 'textarea' && (
            <TextareaField
              register={register}
              errors={errors}
              name={name}
              label={label}
            />
          )}
          {component === 'select' && options && (
            <SelectField
              control={control}
              errors={errors}
              name={name}
              label={label}
              options={options}
              isMulti={isMulti}
            />
          )}
        </React.Fragment>
      ))}
      <Button
        type={'submit'}
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        width={'100%'}
        marginTop={'1rem'}
      >
        {post ? 'Edytuj propozycj?? gry' : 'Dodaj now?? propozycj?? gry'}
      </Button>
      {post && (
        <small>
          *Po edycji post zostanie ponownie przes??any do zatwierdzenia przez
          administratora
        </small>
      )}
    </form>
  )
}

export default PostForm
