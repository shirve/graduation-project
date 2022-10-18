import { useEffect, useRef } from 'react'
import { FieldErrors, UseFormReturn, UseFormStateReturn } from 'react-hook-form'
import autosize from 'autosize'
import styles from './TextareaField.module.scss'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormReturn<any>['register']
  errors: UseFormStateReturn<FieldErrors>['errors']
  name: string
  label: string
  marginTop?: string
  marginBottom?: string
}

const TextareaField = ({
  register,
  errors,
  name,
  label,
  marginTop,
  marginBottom,
  ...props
}: Props) => {
  const { ref, ...rest } = register(name)

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (textareaRef.current) autosize(textareaRef.current)
  }, [textareaRef])

  return (
    <div className={styles.wrapper} style={{ marginTop, marginBottom }}>
      <label className={errors[name] ? styles.labelError : ''}>{label}</label>
      <textarea
        {...rest}
        ref={(e) => {
          ref(e)
          textareaRef.current = e
        }}
        className={errors[name] ? styles.invalid : ''}
        {...props}
      />
      {errors[name] && (
        <span className={styles.error}>{errors[name].message}</span>
      )}
    </div>
  )
}

export default TextareaField
