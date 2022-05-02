const Footer = () => {
  const footerYear = new Date().getFullYear()

  return (
    <footer className='footer'>
      Copyright &copy; {footerYear} Wszelkie prawa zastrzeżone
    </footer>
  )
}

export default Footer
