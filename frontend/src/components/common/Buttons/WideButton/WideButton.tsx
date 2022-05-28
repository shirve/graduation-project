import React from 'react'
import styles from './WideButton.module.scss'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

const WideButton = ({
  type = 'button',
  disabled,
  children,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={styles.button}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default WideButton
