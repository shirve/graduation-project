import { Field, FieldProps } from 'formik'
import { ChangeEvent, ReactElement } from 'react'
import Select, { Options, PropsValue } from 'react-select'

interface Option {
  value: string
  label: string
}

interface Props {
  name: string
  value: string | string[]
  placeholder: string
  onChange: (e: ChangeEvent) => void
  onBlur: (e: FocusEvent) => void
  className: string
  options: Options<Option>
  isMulti?: boolean
}

const SelectField = ({
  name,
  value,
  placeholder,
  onChange,
  className,
  options,
  isMulti = false,
}: Props): ReactElement => {
  return (
    <div className='input-group align-items-center mt-3'>
      <div className='flex-fill'>
        <label htmlFor={name}>{placeholder}</label>
        <Field
          component={CustomSelectFieldComponent}
          className={className}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          options={options}
          isMulti={isMulti}
        />
      </div>
    </div>
  )
}

const CustomSelectFieldComponent = ({
  field,
  form,
  options,
  isMulti = false,
}: FieldProps & { options: Options<Option>; isMulti?: boolean }) => {
  const onChange = (option: PropsValue<Option | Option[]>) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : Array.of((option as Option).value)
    )
  }

  return (
    <Select
      name={field.name}
      value={options && options.find((option) => option.value === field.value)}
      onChange={onChange}
      options={options}
      isMulti={isMulti}
      placeholder=''
    />
  )
}

export default SelectField
