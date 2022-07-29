import { FieldErrors, UseFormReturn, UseFormStateReturn } from 'react-hook-form'
import styles from './FileUploadField.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormReturn<any>['register']
  errors: UseFormStateReturn<FieldErrors>['errors']
  serverError?: string
  name: string
  label: string
  files: FileList
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
  marginTop,
  marginBottom,
  ...props
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
        {...props}
      />
      {errors[name] && (
        <span className={styles.error}>{errors[name].message}</span>
      )}
      {serverError && <span className={styles.error}>{serverError}</span>}
    </div>
  )
}

export default FileUploadField
