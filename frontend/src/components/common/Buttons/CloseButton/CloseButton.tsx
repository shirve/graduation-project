import styles from './CloseButton.module.scss'

interface Props {
  onClick: () => void
}

const CloseButton = ({ onClick }: Props) => {
  return <span className={styles.closeButton} onClick={onClick} />
}

export default CloseButton
