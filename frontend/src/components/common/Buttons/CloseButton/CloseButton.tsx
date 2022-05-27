interface Props {
  onClick: () => void
}

const CloseButton = ({ onClick }: Props) => {
  return <button type='button' className='btn-close' onClick={onClick} />
}

export default CloseButton
