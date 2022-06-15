import { UseFormRegister } from 'react-hook-form'
import styles from './FileUploadField.module.scss'

interface Props {
  register: UseFormRegister<any>
  errors: any
  serverError?: string
  name: string
  label: string
  accept?: string
  multiple?: boolean
  disabled?: boolean
  marginTop?: string
  marginBottom?: string
}

const FileUploadField = ({
  register,
  errors,
  serverError,
  name,
  label,
  accept,
  multiple,
  disabled,
  marginTop,
  marginBottom,
}: Props) => {
  return (
    <div className={styles.wrapper} style={{ marginTop, marginBottom }}>
      <label>{label}</label>
      <input
        {...register(name)}
        type={'file'}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
      />
      {errors[name] && (
        <span className={styles.error}>{errors[name].message}</span>
      )}
      {serverError && <span className={styles.error}>{serverError}</span>}
    </div>
  )
}

export default FileUploadField
