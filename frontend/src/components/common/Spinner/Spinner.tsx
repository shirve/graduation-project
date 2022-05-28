import styles from './Spinner.module.scss'

interface Props {
  centered?: boolean
}

const Spinner = ({ centered = false }: Props) => {
  return (
    <div className={centered ? styles.wrapperCentered : styles.wrapper}>
      <div className={styles.spinner} />
    </div>
  )
}

export default Spinner
