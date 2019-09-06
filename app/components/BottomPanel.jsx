// @flow
import React from 'react'
// import PropTypes from 'prop-types'

type Props = {
  quantity: number,
  currentViewMode: string,
  setViewModeAll: () => void,
  setViewModeActive: () => void,
  setViewModeCompleted: () => void,
  clearCompleted: () => void,
}

export default function BottomPanel(props: Props) {
  const {
    quantity,
    currentViewMode,
    setViewModeAll,
    setViewModeActive,
    setViewModeCompleted,
    clearCompleted,
  } = props
  return (
    <div className="bottom-panel">
      <span className="quantity">{quantity === 1 ? '1 item left' : `${quantity} items left`}</span>
      <div className="filter-buttons-container">
        <button
          className={currentViewMode === 'All'
            ? 'filter-button-all active'
            : 'filter-button-all'}
          type="button"
          onClick={setViewModeAll}
        >
All

        </button>
        <button
          className={currentViewMode === 'Active'
            ? 'filter-button-active active'
            : 'filter-button-active'}
          type="button"
          onClick={setViewModeActive}
        >
Active

        </button>
        <button
          className={currentViewMode === 'Completed'
            ? 'filter-button-completed active'
            : 'filter-button-completed'}
          type="button"
          onClick={setViewModeCompleted}
        >
Completed

        </button>
      </div>
      <button className="clear-completed-button" onClick={clearCompleted} type="button">Clear Completed</button>
    </div>
  )
}
