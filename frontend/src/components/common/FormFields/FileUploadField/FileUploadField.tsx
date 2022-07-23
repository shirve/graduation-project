import { UseFormRegister } from 'react-hook-form'
import styles from './FileUploadField.module.scss'

interface Props {
  register: UseFormRegister<any>
  errors: any
  serverError?: string
  name: string
  label: string
  files: FileList
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
  files,
  accept,
  multiple,
  disabled,
  marginTop,
  marginBottom,
}: Props) => {
  const attachedFiles = files?.length > 0 ? Object.values(files) : []

  return (
    <div className={styles.wrapper} style={{ marginTop, marginBottom }}>
      <label
        htmlFor={'file-dropzone'}
        className={attachedFiles.length > 0 ? styles.filesAttached : ''}
      >
        {attachedFiles.length > 0
          ? attachedFiles.map(({ name }) => name).join(', ')
          : label}
      </label>
      <input
        id={'file-dropzone'}
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
