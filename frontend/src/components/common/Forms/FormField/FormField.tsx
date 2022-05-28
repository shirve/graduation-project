import React, { ChangeEvent, ReactElement, ReactNode } from 'react'
import { Field } from 'formik'
import { Options } from 'react-select'
import SelectField from '../SelectField/SelectField'
import { SelectFieldOptionViewModel } from '../../../../models/Forms/SelectFieldOptionViewModel'
import styles from './FormField.module.scss'

interface Props {
  component: ReactNode
  type?: string
  name: string
  value: string | string[]
  label?: string
  options?: Options<SelectFieldOptionViewModel>
  multiple?: boolean
  invalid?: boolean
  onChange: (e: ChangeEvent) => void
  onBlur: (e: FocusEvent) => void
}

const FormField = ({
  component,
  type,
  name,
  value,
  label,
  options,
  multiple = false,
  invalid,
  onChange,
}: Props): ReactElement => {
  return (
    <React.Fragment>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <Field
        component={component === 'select' ? SelectField : component}
        type={type}
        name={name}
        value={value}
        className={invalid ? `${styles.field} ${styles.invalid}` : styles.field}
        onChange={onChange}
        options={options}
        multiple={multiple}
      />
    </React.Fragment>
  )
}

export default FormField
