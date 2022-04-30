import { Field } from 'formik'
import { ChangeEvent, ReactElement, ReactNode } from 'react'
import { Options } from 'react-select'
import SelectField from './SelectField'
import { Option } from '../../data/post/PostGenres'

interface Props {
  component: ReactNode
  type?: string
  name: string
  value: string | string[]
  label?: string
  className: string
  options?: Options<Option>
  multiple?: boolean
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
  multiple = false,
  onChange,
}: Props): ReactElement => {
  return (
    <div className='mt-3'>
      <label htmlFor={name}>{label}</label>
      <Field
        component={component === 'select' ? SelectField : component}
        type={type}
        name={name}
        value={value}
        className={className}
        onChange={onChange}
        options={options}
        multiple={multiple}
      />
    </div>
  )
}

export default FormField
