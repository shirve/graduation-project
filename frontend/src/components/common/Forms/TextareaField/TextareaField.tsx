import { UseFormRegister } from 'react-hook-form'
import styles from './TextareaField.module.scss'

interface Props {
  register: UseFormRegister<any>
  errors: any
  name: string
  label: string
  placeholder?: string
  marginTop?: string
  marginBottom?: string
}

const TextareaField = ({
  register,
  errors,
  name,
  label,
  placeholder,
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
      />
      {errors[name] && (
        <span className={styles.error}>{errors[name].message}</span>
      )}
    </div>
  )
}

export default TextareaField
