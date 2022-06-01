import { UseFormRegister } from 'react-hook-form'
import styles from './InputField.module.scss'

interface Props {
  register: UseFormRegister<any>
  errors: any
  name: string
  label: string
  type?: string
  placeholder?: string
  disabled?: boolean
  marginTop?: string
  marginBottom?: string
}

const InputField = ({
  register,
  errors,
  name,
  label,
  type,
  placeholder,
  disabled,
  marginTop,
  marginBottom,
}: Props) => {
  return (
    <div className={styles.wrapper} style={{ marginTop, marginBottom }}>
      <label>{label}</label>
      <input
        {...register(name)}
        className={errors[name] ? styles.invalid : ''}
        type={type ? type : 'text'}
        placeholder={placeholder}
        disabled={disabled}
      />
      {errors[name] && (
        <span className={styles.error}>{errors[name].message}</span>
      )}
    </div>
  )
}

export default InputField
