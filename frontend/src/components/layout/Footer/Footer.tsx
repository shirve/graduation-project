import styles from './Footer.module.scss'

const Footer = () => {
  const footerYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      Copyright &copy; {footerYear} Wszelkie prawa zastrzeżone
    </footer>
  )
}

export default Footer
