const Footer = () => {
  const footerYear = new Date().getFullYear()

  return (
    <>
      <hr className='mt-3' />
      <footer className='footer'>
        <div>
          <p>Copyright &copy; {footerYear} Wszelkie prawa zastrzeżone</p>
        </div>
      </footer>
    </>
  )
}

export default Footer
