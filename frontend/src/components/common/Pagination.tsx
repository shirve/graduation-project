import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import { setPage } from '../../features/posts/postSlice'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

const Pagination = () => {
  const dispatch = useAppDispatch()
  const { pagination } = useSelector((state: RootState) => state.fetchedPosts)

  const { page, totalPages } = pagination

  const handlePageChange = (event: { selected: number }) => {
    if (page !== event.selected) {
      dispatch(setPage(event.selected))
    }
  }

  if (totalPages === 1) return null

  return (
    <div className='pagination'>
      <ReactPaginate
        breakLabel='...'
        nextLabel={<FaArrowRight />}
        previousLabel={<FaArrowLeft />}
        onPageChange={(event) => handlePageChange(event)}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        initialPage={page}
      />
    </div>
  )
}

export default Pagination
