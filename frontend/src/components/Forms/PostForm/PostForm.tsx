import React from 'react'
import { useCreatePost, useUpdatePost } from '../../../features/posts/mutations'
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
  onRefetch?: () => void
}

const PostForm = ({ post, handleShowModal, onRefetch }: Props) => {
  const { mutate: createPost } = useCreatePost()
  const { mutate: updatePost } = useUpdatePost({
    onSuccess: () => onRefetch?.(),
  })

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
    if (post) updatePost({ postId: post._id, post: dataCopy })
    if (!post) createPost(dataCopy)
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
        {post ? 'Edytuj propozycję gry' : 'Dodaj nową propozycję gry'}
      </Button>
      {post && (
        <small>
          *Po edycji post zostanie ponownie przesłany do zatwierdzenia przez
          administratora
        </small>
      )}
    </form>
  )
}

export default PostForm
