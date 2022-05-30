import React from 'react'
import styles from './Button.module.scss'

interface Props {
  children: React.ReactNode
  onClick: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  height?: string
  width?: string
  marginTop?: string
  marginBottom?: string
}

const Button = ({
  children,
  onClick,
  type,
  disabled,
  height,
  width,
  marginTop,
  marginBottom,
}: Props) => {
  return (
    <button
      type={type ? type : 'button'}
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      style={{
        height,
        width,
        marginTop,
        marginBottom,
      }}
    >
      {children}
    </button>
  )
}

export default Button
