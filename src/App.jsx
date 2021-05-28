import React, { Component } from 'react'

export class App extends Component {
  state = {
    id: null,
    board: [
      ['_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_'],
      ['_', '_', '_', '_', '_', '_', '_', '_'],
    ],
    state: 'new',
    mines: 10,
    difficulty: 0,
  }

  handleNewGame = async () => {
    const body = { difficulty: 0 }
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    const game = await response.json()
    this.setState(game)
  }

  handleClickedCell = async (rowIndex, colIndex) => {
    const body = { row: rowIndex, col: colIndex }
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    const game = await response.json()
    this.setState(game)
  }
  handleRightClick = async (rowIndex, colIndex) => {
    const body = { row: rowIndex, col: colIndex }
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    const game = await response.json()
    this.setState(game)
  }

  render() {
    // loop through the board array
    // boardGrid = board.map - take every rowIndex and get the contents as 'row'
    const boardGrid = this.state.board.map((row, rowIndex) => {
      // foreach 'row' take every colIndex and get the contents of that 'cell'
      return row.map((cell, colIndex) => {
        // return each cell for each li
        return (
          <li
            key={colIndex}
            //                       need to pass indexes through function
            onClick={() => this.handleClickedCell(rowIndex, colIndex)}
            onContextMenu={() => this.handleRightClick(rowIndex, colIndex)}
          >
            {/* pass 'cell' as li */}
            {cell}
          </li>
        )
      })
    })
    return (
      <main>
        <header>
          <h1>Minesweeper!</h1>
          <p>{this.state.state}</p>
          <p>
            <button onClick={this.handleNewGame}>New Game</button>
          </p>
        </header>
        <ul>{boardGrid}</ul>
      </main>
    )
  }
}
