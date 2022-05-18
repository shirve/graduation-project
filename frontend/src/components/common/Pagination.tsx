import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import { setPage } from '../../features/posts/postSlice'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

const Pagination = () => {
  const dispatch = useAppDispatch()
  const { pagination } = useSelector((state: RootState) => state.fetchedPosts)

  const { page, totalPages, prevPage, nextPage } = pagination

  if (totalPages === 1) return null

  return (
    <div className='pagination'>
      <button
        className='pagination-prev'
        onClick={() => dispatch(setPage(prevPage ? page - 1 : page))}
        disabled={!prevPage}
      >
        <FaArrowLeft /> Poprzednia strona
      </button>
      <button
        className='pagination-next'
        onClick={() => dispatch(setPage(nextPage ? page + 1 : page))}
        disabled={!nextPage}
      >
        Następna strona <FaArrowRight />
      </button>
    </div>
  )
}

export default Pagination
