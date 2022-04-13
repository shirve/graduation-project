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
  formFloating?: boolean
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
  formFloating = false,
}: Props): ReactElement => {
  return (
    <div className='input-group align-items-center mt-3'>
      {icon && <span className='input-icon'>{icon}</span>}
      <div className={`flex-fill ${formFloating && 'form-floating'}`}>
        {!formFloating && <label htmlFor={name}>{placeholder}</label>}
        <Field
          component={component}
          type={type}
          className={className}
          id={name}
          name={name}
          value={value}
          placeholder={formFloating && placeholder}
          onChange={onChange}
          style={{ height: component === 'textarea' && 100 }}
        />
        {formFloating && <label htmlFor={name}>{placeholder}</label>}
      </div>
    </div>
  )
}

export default InputField
