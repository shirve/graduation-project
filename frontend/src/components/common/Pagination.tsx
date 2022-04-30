import lodash from 'lodash'
import { ReactElement } from 'react'

interface Props {
  itemsCount: number
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
}: Props): ReactElement | null => {
  const pagesCount = Math.ceil(itemsCount / pageSize)

  if (pagesCount === 1) return null

  const pages = lodash.range(1, pagesCount + 1)

  return (
    <div className='pagination'>
      <ul className='pagination-pages'>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <a className='page-link' onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
      <ul className='pagination-sizes'>
        <li className='page-item'>
          <a className='page-link' onClick={() => onPageSizeChange(10)}>
            10
          </a>
        </li>
        <li className='page-item'>
          <a className='page-link' onClick={() => onPageSizeChange(10)}>
            20
          </a>
        </li>
        <li className='page-item'>
          <a className='page-link' onClick={() => onPageSizeChange(10)}>
            30
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
