import { FieldProps } from 'formik'
import Select, { Options, PropsValue } from 'react-select'
import { SelectFieldOptionViewModel } from '../../../../models/Forms/SelectFieldOptionViewModel'

interface Props {
  options: Options<SelectFieldOptionViewModel>
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
  const onChange = (
    option: PropsValue<
      SelectFieldOptionViewModel | SelectFieldOptionViewModel[]
    >
  ) => {
    form.setFieldValue(
      field.name,
      multiple
        ? (option as SelectFieldOptionViewModel[]).map(
            (item: SelectFieldOptionViewModel) => item.value
          )
        : Array.of((option as SelectFieldOptionViewModel).value)
    )
  }

  return (
    <Select
      name={field.name}
      value={field.value.map((value: string) =>
        options.find((option) => value === option.value && option)
      )}
      onChange={onChange}
      options={options}
      isMulti={multiple}
      placeholder={placeholder}
    />
  )
}

export default SelectField
