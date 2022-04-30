import { FieldProps } from 'formik'
import Select, { Options, PropsValue } from 'react-select'
import { Option } from '../../data/post/PostGenres'

interface Props {
  options: Options<Option>
  multiple?: boolean
  placeholder?: string
}

const SelectField = ({
  field,
  form,
  options,
  multiple = false,
  placeholder = '',
}: Props & FieldProps) => {
  const onChange = (option: PropsValue<Option | Option[]>) => {
    form.setFieldValue(
      field.name,
      multiple
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
      isMulti={multiple}
      placeholder={placeholder}
    />
  )
}

export default SelectField
