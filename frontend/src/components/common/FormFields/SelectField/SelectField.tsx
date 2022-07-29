import {
  Controller,
  FieldErrors,
  UseFormReturn,
  UseFormStateReturn,
} from 'react-hook-form'
import Select, {
  Props as ReactSelectProps,
  MultiValue,
  SingleValue,
} from 'react-select'
import { CustomSelectFieldStyles } from '../../../../styles/SelectField/CustomSelectFieldStyles'
import styles from './SelectField.module.scss'

interface Props extends ReactSelectProps<any, boolean> {
  control: UseFormReturn<any>['control']
  errors: UseFormStateReturn<FieldErrors>['errors']
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
  ...props
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
              placeholder={placeholder ?? ''}
              value={options.filter((option) => value?.includes(option.value))}
              onChange={(selectedOption) => {
                onChange(
                  isMulti
                    ? (selectedOption as MultiValue<any>).map(
                        (option) => option.value
                      )
                    : (selectedOption as SingleValue<any>)?.value
                )
              }}
              isMulti={isMulti}
              styles={CustomSelectFieldStyles}
              isDisabled={disabled}
              {...props}
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
