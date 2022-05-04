import { FieldProps } from 'formik'
import Select, { Options, PropsValue } from 'react-select'
import { Option, PostGenres } from '../../data/post/PostGenres'

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

  const values = field.value.map((value: string) =>
    PostGenres.find((postGenre) => value === postGenre.value && postGenre)
  )

  return (
    <Select
      name={field.name}
      value={values}
      onChange={onChange}
      options={options}
      isMulti={multiple}
      placeholder={placeholder}
    />
  )
}

export default SelectField
