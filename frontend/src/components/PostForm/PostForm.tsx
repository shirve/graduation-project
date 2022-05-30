import React from 'react'
import { useAppDispatch } from '../../app/store'
import { createPost, updatePost } from '../../features/posts/postSlice'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Button from '../common/Buttons/Button/Button'
import InputField from '../common/Forms/InputField/InputField'
import TextareaField from '../common/Forms/TextareaField/TextareaField'
import SelectField from '../common/Forms/SelectField/SelectField'
import { PostFormFields } from '../../constants/Posts/PostFormFields'
import { PostViewModel } from '../../models/Posts/PostViewModel'
import { PostDataViewModel } from '../../models/Posts/PostDataViewModel'

interface Props {
  post?: PostViewModel
}

const PostForm = ({ post }: Props) => {
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
  }

  return (
    <form>
      {PostFormFields.map((field) => (
        <React.Fragment key={field.name}>
          {field.component === 'input' && (
            <InputField
              register={register}
              errors={errors}
              name={field.name}
              label={field.label}
              marginTop={'1rem'}
            />
          )}
          {field.component === 'textarea' && (
            <TextareaField
              register={register}
              errors={errors}
              name={field.name}
              label={field.label}
              marginTop={'0.5rem'}
            />
          )}
          {field.component === 'select' && field.options && (
            <SelectField
              control={control}
              errors={errors}
              name={field.name}
              label={field.label}
              options={field.options}
              isMulti={field.isMulti}
              marginTop={'0.5rem'}
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
