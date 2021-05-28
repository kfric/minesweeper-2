import React, { Component } from 'react'

export class App extends Component {
  state = {
    id: null,
    //
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

  render() {
    return (
      <main>
        <header>
          <h1>Minesweeper!</h1>
          <p>
            <button>New Game</button>
          </p>
        </header>
        <ul>
          {/* take this.state.board, take each row as rowIndex */}
          {this.state.board.map((row, rowIndex) => {
            // then foreach row, take each cell as colIndex
            return row.map((cell, colIndex) => {
              return <li></li>
            })
          })}
        </ul>
      </main>
    )
  }
}
