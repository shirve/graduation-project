import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useChangePassword } from '../../../features/users/mutations'
import InputField from '../../common/FormFields/InputField/InputField'
import Button from '../../common/Buttons/Button/Button'
import { UserPasswordChangeViewModel } from '../../../models/Users/UserPasswordChangeViewModel'
import styles from './UserPasswordChangeForm.module.scss'
import { UserPasswordChangeFormFields } from '../../../constants/Users/UserPasswordChangeFormFields'

const UserPasswordChangeForm = () => {
  const { mutate: changePassword } = useChangePassword({
    onSuccess: () => {
      reset()
    },
  })

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
    changePassword(data)
  }

  return (
    <form className={styles.form}>
      {UserPasswordChangeFormFields.map(({ name, label }) => (
        <InputField
          key={name}
          register={register}
          errors={errors}
          name={name}
          label={label}
          type={'password'}
        />
      ))}
      <Button
        type={'submit'}
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        fullWidth
      >
        Zmień hasło
      </Button>
    </form>
  )
}

export default UserPasswordChangeForm
