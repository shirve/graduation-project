import ReactPaginate from 'react-paginate'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'
import styles from './Pagination.module.scss'

interface Props {
  page: number
  totalPages: number
  onPageChange: (newPage: number) => void
}

const Pagination = ({ page, totalPages, onPageChange }: Props) => {
  if (totalPages === 1) return null

  return (
    <ReactPaginate
      breakLabel='...'
      nextLabel={<FaAngleRight />}
      previousLabel={<FaAngleLeft />}
      onPageChange={(event) => onPageChange(event.selected)}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      pageCount={totalPages}
      initialPage={page}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      disabledClassName={styles.disabled}
      pageClassName={styles.pageItem}
      pageLinkClassName={styles.pageLink}
      previousClassName={styles.pageItem}
      previousLinkClassName={styles.pageLink}
      nextClassName={styles.pageItem}
      nextLinkClassName={styles.pageLink}
      breakClassName={styles.pageItem}
      breakLinkClassName={styles.pageLink}
    />
  )
}

export default Pagination
