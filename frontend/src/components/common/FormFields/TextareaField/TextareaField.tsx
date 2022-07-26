import { useEffect, useRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import autosize from 'autosize'
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
  const { ref, ...rest } = register(name)

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (textareaRef.current) autosize(textareaRef.current)
  }, [textareaRef])

  return (
    <div className={styles.wrapper} style={{ marginTop, marginBottom }}>
      <label>{label}</label>
      <textarea
        {...rest}
        ref={(e) => {
          ref(e)
          textareaRef.current = e
        }}
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
