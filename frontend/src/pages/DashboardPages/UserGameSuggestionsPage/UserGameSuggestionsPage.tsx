import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserPosts } from '../../../features/posts/postSlice'
import { RootState } from '../../../app/store'
import HeaderContext from '../../../context/header/HeaderContext'
import { GameSuggestionViewModel } from '../../../models/GameSuggestions/GameSuggestionViewModel'
import GameSuggestionItems from '../../../components/GameSuggestionItems/GameSuggestionItems'
import styles from './UserGameSuggestionsPage.module.scss'

type FilterType = 'approved' | 'unapproved' | 'rejected'

const UserGameSuggestionsPage = () => {
  const dispatch = useDispatch()

  const { setHeader } = useContext(HeaderContext)

  const { posts, loading } = useSelector(
    (state: RootState) => state.gameSuggestions
  )

  const [filterType, setFilterType] = useState<FilterType>('approved')
  const [filteredPosts, setFilteredPosts] = useState<GameSuggestionViewModel[]>(
    []
  )

  const filteredApprovedPosts = posts.filter((post) => post.status.approved)

  const filteredUnapprovedPosts = posts.filter(
    (post) => !post.status.approved && !post.status.rejected
  )

  const filteredRejectedPosts = posts.filter((post) => post.status.rejected)

  const handleFilterChange = (type: FilterType) => {
    switch (type) {
      case 'approved':
        setFilteredPosts(filteredApprovedPosts)
        setFilterType('approved')
        break
      case 'unapproved':
        setFilteredPosts(filteredUnapprovedPosts)
        setFilterType('unapproved')
        break
      case 'rejected':
        setFilteredPosts(filteredRejectedPosts)
        setFilterType('rejected')
        break
    }
  }

  useEffect(() => {
    setFilterType('approved')
    setFilteredPosts(filteredApprovedPosts)
  }, [])

  useEffect(() => {
    handleFilterChange(filterType)
  }, [posts])

  useEffect(() => {
    setHeader('TWOJE PROPOZYCJE GIER')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    dispatch(getUserPosts())
  }, [])

  return (
    <React.Fragment>
      <ul className={styles.navigation}>
        <li
          className={filterType === 'approved' && styles.active}
          onClick={() => handleFilterChange('approved')}
        >
          Zatwierdzone
          <span className={styles.badge}>{filteredApprovedPosts.length}</span>
        </li>
        <li
          className={filterType === 'unapproved' && styles.active}
          onClick={() => handleFilterChange('unapproved')}
        >
          Niezatwierdzone
          <span className={styles.badge}>{filteredUnapprovedPosts.length}</span>
        </li>
        <li
          className={filterType === 'rejected' && styles.active}
          onClick={() => handleFilterChange('rejected')}
        >
          Odrzucone
          <span className={styles.badge}>{filteredRejectedPosts.length}</span>
        </li>
      </ul>
      {filteredPosts.length === 0 && (
        <div className={styles.info}>
          {filterType === 'approved' && (
            <div>Nie masz jeszcze żadnych zatwierdzonych propozycji gier</div>
          )}
          {filterType === 'unapproved' && (
            <div>Nie masz żadnych niezatwierdzonych propozycji gier</div>
          )}
          {filterType === 'rejected' && (
            <div>Nie masz żadnych odrzuconych propozycji gier</div>
          )}
        </div>
      )}
      <GameSuggestionItems
        posts={filteredPosts}
        loading={loading}
        displayedButtons={['edit', 'delete']}
      />
    </React.Fragment>
  )
}

export default UserGameSuggestionsPage
