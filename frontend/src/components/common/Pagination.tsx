import React from 'react'
import lodash from 'lodash'

interface Props {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: Props): React.ReactElement | null => {
  if (totalPages === 1) return null

  const pages = lodash.range(0, totalPages)

  return (
    <div className='pagination'>
      <ul className='pagination-pages'>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <a className='page-link' onClick={() => onPageChange(page)}>
              {page + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
