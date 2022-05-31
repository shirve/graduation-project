import { Control, Controller } from 'react-hook-form'
import Select, { MultiValue, SingleValue } from 'react-select'
import { SelectFieldOptionViewModel } from '../../../../models/Forms/SelectFieldOptionViewModel'
import styles from './SelectField.module.scss'

interface Props {
  control: Control<any>
  errors: any
  name: string
  label: string
  options: SelectFieldOptionViewModel[]
  isMulti?: boolean
  placeholder?: string
  marginTop?: string
  marginBottom?: string
}

const SelectField = ({
  control,
  errors,
  name,
  label,
  options,
  isMulti,
  placeholder,
  marginTop,
  marginBottom,
}: Props) => {
  return (
    <div className={styles.wrapper} style={{ marginTop, marginBottom }}>
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <Select
              options={options}
              placeholder={placeholder ? placeholder : ''}
              value={options.filter((option) => value?.includes(option.value))}
              onChange={(selectedOption) =>
                onChange(
                  isMulti
                    ? (
                        selectedOption as MultiValue<SelectFieldOptionViewModel>
                      ).map((option) => option.value)
                    : (
                        selectedOption as SingleValue<SelectFieldOptionViewModel>
                      )?.value
                )
              }
              isMulti={isMulti ? isMulti : false}
            />
          )
        }}
      />
      {errors[name] && (
        <span className={styles.error}>{errors[name].message}</span>
      )}
    </div>
  )
}

export default SelectField
