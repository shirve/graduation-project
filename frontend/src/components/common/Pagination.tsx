import lodash from 'lodash'
import { ReactElement } from 'react'

interface Props {
  itemsCount: number
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}: Props): ReactElement | null => {
  const pagesCount = Math.ceil(itemsCount / pageSize)
  if (pagesCount === 1) return null
  const pages = lodash.range(1, pagesCount + 1)
  return (
    <nav>
      <ul className='pagination d-flex justify-content-center'>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <button className='page-link' onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
