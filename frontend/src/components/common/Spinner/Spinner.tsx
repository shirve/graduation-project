import './Spinner.scss'

interface Props {
  centered?: boolean
}

const Spinner = ({ centered = false }: Props) => {
  return (
    <div className={centered ? 'spinner-wrapper-centered' : 'spinner-wrapper'}>
      <div className='spinner' />
    </div>
  )
}

export default Spinner
