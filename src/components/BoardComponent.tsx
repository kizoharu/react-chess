import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
  const [selectedCell, setSekectedCell] = useState<Cell | null>(null)

  function click(cell:Cell) {
    if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell)
      swapPlayer();
      setSekectedCell(null);
    } else {
      if(cell.figure?.color === currentPlayer?.color) {
        setSekectedCell(cell)
      }
    }

  }

  useEffect(() => {
    hightlightCells()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell])

  function hightlightCells() {
    board.hightlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard)
  }

  return (
    <div>
      <h3>Current player {currentPlayer?.color}</h3>
      <div className='board'>
        {board.cells.map((row, index) => 
          <React.Fragment key={index}>
            {row.map(cell => 
              <CellComponent
                click={click}
                key={cell.id}
                cell={cell}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />  
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default BoardComponent;