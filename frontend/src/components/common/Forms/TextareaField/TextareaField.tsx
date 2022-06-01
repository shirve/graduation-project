import { UseFormRegister } from 'react-hook-form'
import styles from './TextareaField.module.scss'

interface Props {
  register: UseFormRegister<any>
  errors: any
  name: string
  label: string
  placeholder?: string
  disabled?: boolean
  marginTop?: string
  marginBottom?: string
}

const TextareaField = ({
  register,
  errors,
  name,
  label,
  placeholder,
  disabled,
  marginTop,
  marginBottom,
}: Props) => {
  return (
    <div className={styles.wrapper} style={{ marginTop, marginBottom }}>
      <label>{label}</label>
      <textarea
        {...register(name)}
        className={errors[name] ? styles.invalid : ''}
        placeholder={placeholder}
        disabled={disabled}
      />
      {errors[name] && (
        <span className={styles.error}>{errors[name].message}</span>
      )}
    </div>
  )
}

export default TextareaField
