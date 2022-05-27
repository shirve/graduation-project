import React from 'react'
import { GameSuggestionViewModel } from '../../models/GameSuggestions/GameSuggestionViewModel'
import { GameSuggestionButtonTypes } from '../../models/GameSuggestions/GameSuggestionButtonTypes'
import GameSuggestionItem from '../common/GameSuggestionItem/GameSuggestionItem'
import Pagination from '../common/Pagination/Pagination'
import Spinner from '../common/Spinner/Spinner'

interface Props {
  posts: GameSuggestionViewModel[]
  loading?: string
  onGenreChange?: (genre: string) => void
  displayedButtons?: GameSuggestionButtonTypes[]
}

const GameSuggestionItems = ({
  posts,
  loading,
  onGenreChange,
  displayedButtons,
}: Props) => {
  if (loading === 'pending') return <Spinner />

  return (
    <React.Fragment>
      {posts.map((post, index) => (
        <GameSuggestionItem
          key={index}
          post={post}
          onGenreChange={onGenreChange}
          displayedButtons={displayedButtons}
        />
      ))}
      <Pagination />
    </React.Fragment>
  )
}

export default GameSuggestionItems
