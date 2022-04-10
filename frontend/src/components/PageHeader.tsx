import { ReactElement, ReactNode } from 'react'

interface Props {
  title: string
  withButton?: boolean
  children?: ReactNode
}

const Header = ({
  title,
  withButton = false,
  children,
}: Props): ReactElement => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='page-header-text-primary page-header-title'>
          {title}
        </div>
      </div>
      {children && (
        <div className='row'>
          <div
            className={`page-header-description${
              withButton ? '-with-button' : ' text-center'
            }`}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
