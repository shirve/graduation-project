import { Field } from 'formik'
import { ChangeEvent, ReactElement, ReactNode } from 'react'

interface Props {
  component?: string
  type: string
  name: string
  value: string
  placeholder: string
  onChange: (e: ChangeEvent) => void
  onBlur: (e: FocusEvent) => void
  className: string
  icon?: ReactNode
}

const InputField = ({
  component = 'input',
  type,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  className,
  icon,
}: Props): ReactElement => {
  const TextAreaStyle = () => {
    if (component === 'textarea') return { height: 100 }
  }

  return (
    <div className='input-group align-items-center mt-3'>
      {icon && <span className='input-icon'>{icon}</span>}
      <div className='form-floating flex-fill'>
        <Field
          component={component}
          type={type}
          className={className}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          style={TextAreaStyle()}
        />
        <label htmlFor={name}>{placeholder}</label>
      </div>
    </div>
  )
}

export default InputField
