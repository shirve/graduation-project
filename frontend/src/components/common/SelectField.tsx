import { FieldProps } from 'formik'
import Select, { Options, PropsValue } from 'react-select'

interface Option {
  value: string
  label: string
}

interface Props {
  options: Options<Option>
  isMulti?: boolean
  placeholder?: string
}

const SelectField = ({
  field,
  form,
  options,
  isMulti = false,
  placeholder = '',
}: Props & FieldProps) => {
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
      value={options.find((option) => option.value === field.value)}
      onChange={onChange}
      options={options}
      isMulti={isMulti}
      placeholder={placeholder}
    />
  )
}

export default SelectField
