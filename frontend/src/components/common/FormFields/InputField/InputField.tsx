import { FieldErrors, UseFormReturn, UseFormStateReturn } from 'react-hook-form'
import styles from './InputField.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormReturn<any>['register']
  errors: UseFormStateReturn<FieldErrors>['errors']
  serverError?: string
  name: string
  label: string
  type?: string
  marginTop?: string
  marginBottom?: string
}

const InputField = ({
  register,
  errors,
  serverError,
  name,
  label,
  type,
  marginTop,
  marginBottom,
  ...props
}: Props) => {
  return (
    <div className={styles.wrapper} style={{ marginTop, marginBottom }}>
      <label className={errors[name] ? styles.labelError : ''}>{label}</label>
      <input
        {...register(name)}
        className={errors[name] ? styles.invalid : ''}
        type={type ?? 'text'}
        {...props}
      />
      {errors[name] && (
        <span className={styles.error}>{errors[name].message}</span>
      )}
      {serverError && <span className={styles.error}>{serverError}</span>}
    </div>
  )
}

export default InputField
