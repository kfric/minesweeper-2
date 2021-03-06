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
    state: null,
    mines: null,
    difficulty: null,
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
  handleRightClick = async (event, rowIndex, colIndex) => {
    event.preventDefault()
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
  changeIcon = cell => {
    switch (cell) {
      case 'F':
        return '🚩'
      case '_':
        return ' '
      case '*':
        return '💣'
      case '@':
        return '💢'
      default:
        return cell
    }
  }

  changeCellClassName = cell => {
    switch (cell) {
      case 'F':
        return 'flag'
      case '_':
        return 'free'
      case '*':
        return 'bomb'
      case '@':
        return 'flag-bomb'
      default:
        return cell
    }
  }

  // Am I on the right track with changing the game 'status' msg?
  // changeStatusMessage = state => {
  //   switch (state) {
  //     case 'new':
  //       return 'New Game stated. Good Luck'
  //     case 'playing':
  //       return 'Game in progres...'
  //     case 'won':
  //       return 'Crisis everted!'
  //     case 'lost':
  //       return 'LOOOOSSSERRRR'
  //     default:
  //   }
  // }

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
            // when cell is right clicked perform handRightClick function
            onContextMenu={() =>
              this.handleRightClick(event, rowIndex, colIndex)
            }
            // when the cell is clicked preform changeCellClassName(cell)
            // assign to className of Li
            className={this.changeCellClassName(cell)}
          >
            {/* pass 'cell' as each li */}
            {this.changeIcon(cell)}
          </li>
        )
      })
    })
    return (
      <main>
        <header>
          <h1>Sweeper of Mines!</h1>
          <p>{this.state.state}</p>
          <p>Mines: {this.state.mines}</p>
          <p>
            <button onClick={this.handleNewGame}>New Game</button>
          </p>
        </header>
        <ul>{boardGrid}</ul>
      </main>
    )
  }
}
