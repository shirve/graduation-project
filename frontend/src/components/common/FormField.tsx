import { Field } from 'formik'
import { ChangeEvent, ReactElement, ReactNode } from 'react'
import { Options } from 'react-select'

interface Option {
  value: string
  label: string
}

interface Props {
  component: ReactNode
  type?: string
  name: string
  value: string | string[]
  label?: string
  className: string
  options?: Options<Option>
  isMulti?: boolean
  onChange: (e: ChangeEvent) => void
  onBlur: (e: FocusEvent) => void
}

const FormField = ({
  component,
  type,
  name,
  value,
  label,
  className,
  options,
  isMulti = false,
  onChange,
}: Props): ReactElement => {
  return (
    <div className='mt-3'>
      <label htmlFor={name}>{label}</label>
      <Field
        component={component}
        type={type}
        name={name}
        value={value}
        className={className}
        onChange={onChange}
        options={options}
        isMulti={isMulti}
      />
    </div>
  )
}

export default FormField
