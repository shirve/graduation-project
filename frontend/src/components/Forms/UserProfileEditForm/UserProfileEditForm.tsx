import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../app/store'
import { updateUser } from '../../../features/users/userSlice'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from '../../common/FormFields/InputField/InputField'
import TextareaField from '../../common/FormFields/TextareaField/TextareaField'
import Button from '../../common/Buttons/Button/Button'
import { UserDetailsViewModel } from '../../../models/Users/UserDetailsViewModel'
import styles from './UserProfileEditForm.module.scss'

const UserProfileEditForm = () => {
  const { user } = useSelector((state: RootState) => state.user)

  const dispatch = useAppDispatch()

  const profileEditSchema = yup.object().shape({
    github: yup
      .string()
      .matches(
        /^https:\/\/github.com\/.+/g,
        'Link musi być w formacie https://github.com/[nazwa-użytkownika]'
      )
      .nullable(),
    technologies: yup.string().max(255).nullable(),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserDetailsViewModel>({
    resolver: yupResolver(profileEditSchema),
  })

  useEffect(() => {
    if (user) {
      const { _id, roles, ...userData } = user
      reset({ ...userData })
    }
  }, [user])

  const onSubmit = (data: UserDetailsViewModel) => {
    dispatch(updateUser(data))
  }

  return (
    <form>
      <div className={styles.card}>
        <InputField
          register={register}
          errors={errors}
          name={'firstName'}
          label={'Imię'}
          disabled
        />
        <InputField
          register={register}
          errors={errors}
          name={'lastName'}
          label={'Nazwisko'}
          disabled
        />
        <InputField
          register={register}
          errors={errors}
          name={'email'}
          label={'Email'}
          disabled
        />
        <InputField
          register={register}
          errors={errors}
          name={'github'}
          label={'Github'}
        />
        <TextareaField
          register={register}
          errors={errors}
          name={'technologies'}
          label={'Technologie'}
        />
      </div>
      <Button
        type={'submit'}
        onClick={handleSubmit(onSubmit)}
        width={'100%'}
        marginTop={'1rem'}
        disabled={isSubmitting}
      >
        Aktualizuj
      </Button>
    </form>
  )
}

export default UserProfileEditForm
