import React from 'react'
import Modal, { Props as ReactModalProps } from 'react-modal'
import styles from './ModalWrapper.module.scss'

interface Props extends ReactModalProps {
  isOpen: boolean
  children: React.ReactNode
}

Modal.setAppElement(document.getElementById('root') as HTMLElement)

const ModalWrapper = ({ isOpen, children, ...props }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={styles.overlay}
      className={styles.content}
      {...props}
    >
      {children}
    </Modal>
  )
}

export default ModalWrapper
