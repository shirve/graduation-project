import { Control, Controller } from 'react-hook-form'
import Select, { MultiValue, SingleValue } from 'react-select'
import { CustomSelectFieldStyles } from '../../../../styles/SelectField/CustomSelectFieldStyles'
import styles from './SelectField.module.scss'

interface Props {
  control: Control<any>
  errors: any
  name: string
  label: string
  options: any[]
  isMulti?: boolean
  placeholder?: string
  disabled?: boolean
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
  disabled,
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
                    ? (selectedOption as MultiValue<any>).map(
                        (option) => option.value
                      )
                    : (selectedOption as SingleValue<any>)?.value
                )
              }
              isMulti={isMulti}
              styles={CustomSelectFieldStyles}
              isDisabled={disabled}
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
