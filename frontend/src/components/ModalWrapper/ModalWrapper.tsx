import React from 'react'
import Modal, { Props as ReactModalProps } from 'react-modal'
import styles from './ModalWrapper.module.scss'

interface Props extends ReactModalProps {
  isOpen: boolean
  children: React.ReactNode
  fullWidth?: boolean
}

const ModalWrapper = ({ isOpen, children, fullWidth, ...props }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={styles.overlay}
      className={`${styles.content} ${fullWidth && styles.fullWidth}`}
      {...props}
    >
      {children}
    </Modal>
  )
}

export default ModalWrapper
