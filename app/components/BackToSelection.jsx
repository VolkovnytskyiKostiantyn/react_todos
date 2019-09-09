import React from 'react'

export default function BackToSelectionPanel(props) {
    const { returnToTodosSelection } = props
    return (
    <div className="back-to-selection-panel">
    <button className="back-button" type="button" onClick={returnToTodosSelection}>Back</button>
  </div>
    )
}