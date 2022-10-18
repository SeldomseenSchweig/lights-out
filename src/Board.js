import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols }) {
  const [board, setBoard] = useState(createBoard(nrows,ncols));
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard(nrows , ncols) {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    const randValue = () => Math.floor(Math.random() * 2)
    const trueFalseTable = [true,false]
   
    for (let i = 0; i < ncols; i++) {
      initialBoard[i]= []
      let row = []
      for (let j = 0; j < nrows; j++) {
        // initialBoard[i][j] = <Cell isLit={trueFalseTable[randValue()]}/>
        row.push(<Cell isLit={trueFalseTable[randValue()]}/>)
      }
      initialBoard[i].push(<tr>{row}</tr>)
      
      
    }
    

  
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.

    for (let i = 0; i <ncols; i++) {
      
      for (let j = 0; j < nrows; j++) {
         if ( board[i][j] === 'true'){

           return false
         }
      }
    }
    return true

  }

  function flipCellsAroundMe(coord) {
    
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
        
      };
      ////////// My work starts here taking the old board
      const boardCopy = [...oldBoard]

      flipCell(y,x, boardCopy);
      flipCell(y+1,x, boardCopy);
      flipCell(y-1,x, boardCopy);
      flipCell(y,x+1, boardCopy);
      flipCell(y,x-1, boardCopy);
      return boardCopy;

    
    
          // TODO: Make a (deep) copy of the oldBoard

          // TODO: in the copy, flip this cell and the cells around it
    
          // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  // if (hasWon()){
  //   return (
  //     <table>
  //     <tbody>
  //     {board}
  //     </tbody>
  //   </table>

  //   )
    

  // }

  return (
    <table>
      <tbody>
      {board}
      </tbody>
    </table>
  )
}

export default Board;
