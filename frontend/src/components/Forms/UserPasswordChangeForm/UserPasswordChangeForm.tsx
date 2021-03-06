import { useAppDispatch } from '../../../app/store'
import { changePassword } from '../../../features/users/userSlice'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from '../../common/FormFields/InputField/InputField'
import Button from '../../common/Buttons/Button/Button'
import { UserPasswordChangeViewModel } from '../../../models/Users/UserPasswordChangeViewModel'
import styles from './UserPasswordChangeForm.module.scss'
import { UserPasswordChangeFormFields } from '../../../constants/Users/UserPasswordChangeFormFields'

const UserPasswordChangeForm = () => {
  const dispatch = useAppDispatch()

  const passwordChangeSchema = yup.object().shape({
    oldPassword: yup.string().required('To pole jest wymagane'),
    newPassword: yup
      .string()
      .matches(/(?=.*[A-ZĄĆĘŁŃÓŚŹŻ])/, 'Hasło musi mieć jedną dużą literę')
      .matches(/(?=.*[a-ząćęłńóśźż])/, 'Hasło musi mieć jedną małą literę')
      .matches(/(?=.*\d)/, 'Hasło musi mieć jedną liczbę')
      .matches(/(?=.*?[!@#$%^&*?])/, 'Hasło musi mieć jeden znak specjalny')
      .min(6, 'Hasło musi mieć minimum 6 znaków')
      .max(50, 'Hasło może mieć maksimum 50 znaków')
      .required('To pole jest wymagane'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Hasła się nie zgadzają')
      .required('To pole jest wymagane'),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserPasswordChangeViewModel>({
    resolver: yupResolver(passwordChangeSchema),
  })

  const onSubmit = (data: UserPasswordChangeViewModel) => {
    dispatch(changePassword(data))
    reset()
  }

  return (
    <form>
      <div className={styles.card}>
        {UserPasswordChangeFormFields.map(({ name, label }) => (
          <InputField
            register={register}
            errors={errors}
            name={name}
            label={label}
            type={'password'}
          />
        ))}
      </div>
      <Button
        type={'submit'}
        onClick={handleSubmit(onSubmit)}
        width={'100%'}
        marginTop={'1rem'}
        disabled={isSubmitting}
      >
        Zmień hasło
      </Button>
    </form>
  )
}

export default UserPasswordChangeForm
