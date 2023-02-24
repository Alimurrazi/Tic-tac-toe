import "./App.css";
import Cell from "./Cell";
import { useState,useEffect } from "react";
import { PrimaryButton } from '@fluentui/react/lib/Button';
import React from "react";
import { BoardRow } from "./Types/Board.interface";

const checkIfGameOver = (board) => {
  let result = {
    status: false,
    winningCells: [] as Number[]
  }
  // Check if any row has the same value
  for (let i = 0; i < 3; i++) {
    if (
      board[i].columns[0].value !== "" &&
      board[i].columns[0].value === board[i].columns[1].value &&
      board[i].columns[1].value === board[i].columns[2].value
    ) {
      result = {
        status: true,
        winningCells: [board[i].columns[0].id, board[i].columns[1].id, board[i].columns[2].id]
      }
    }
  }

  // Check if any column has the same value
  for (let i = 0; i < 3; i++) {
    if (
      board[0].columns[i].value !== "" &&
      board[0].columns[i].value === board[1].columns[i].value &&
      board[1].columns[i].value === board[2].columns[i].value
    ) {
      result = {
        status: true,
        winningCells: [board[0].columns[i].id, board[1].columns[i].id, board[2].columns[i].id]
      }
    }
  }

  // Check the first diagonal
  if (
    board[0].columns[0].value !== "" &&
    board[0].columns[0].value === board[1].columns[1].value &&
    board[1].columns[1].value === board[2].columns[2].value
  ) {
    result = {
      status: true,
      winningCells: [board[0].columns[0].id, board[1].columns[1].id, board[2].columns[2].id]
    }
  }

  // Check the second diagonal
  if (
    board[0].columns[2].value !== "" &&
    board[0].columns[2].value === board[1].columns[1].value &&
    board[1].columns[1].value === board[2].columns[0].value
  ) {
    result = {
      status: true,
      winningCells: [board[0].columns[2].id, board[1].columns[1].id, board[2].columns[0].id]
    }
  }

  return result;
};

function App() {
  let initialCellData:BoardRow[] = [
    {
      rowId: 1,
      columns: [
        { id: 11, value: "" },
        { id: 12, value: "" },
        { id: 13, value: "" },
      ],
    },
    {
      rowId: 2,
      columns: [
        { id: 21, value: "" },
        { id: 22, value: "" },
        { id: 23, value: "" },
      ],
    },
    {
      rowId: 3,
      columns: [
        { id: 31, value: "" },
        { id: 32, value: "" },
        { id: 33, value: "" },
      ],
    },
  ];

  const [cellStates, setCellStates] = useState(initialCellData);
  const [isFirstPlayer, setIsFirstPlayer] = useState(true);
  const [winStatus, setWinStatus] = useState(false);
  const [winningCells, setWinningCells] = useState<Number[]>([]);
  const [isReset, setIsReset] = useState(false);
  useEffect(()=>{
    const result = checkIfGameOver(cellStates);
    if(result.status) {
      setWinStatus(true);
      setWinningCells(result.winningCells);
    } else {
      if (!isReset) {
        setIsFirstPlayer(prevState => !prevState);
      }
      setIsReset(false);
    }
  },[cellStates,isReset])

  const handleReset=()=>{
    setIsReset(true);
    setCellStates(initialCellData);
    setWinStatus(false);
    setWinningCells([]);
  }

  return (
    <div className="App">
      <div className="App-content">

        <div className="mb-20">
        {!winStatus && isFirstPlayer && <div>First Player's Turn Now</div>}
         {!winStatus && !isFirstPlayer && <div>Second Player's Turn Now</div>}
         {winStatus && isFirstPlayer && <div>First Player Wins</div>}
         {winStatus && !isFirstPlayer && <div>Second Player Wins</div>}
        </div>

        <div className="board">
          {initialCellData.map((row) => (
            <div className="row" key={row.rowId.toString()}>
              {row.columns.map((col) => (
                <Cell key={col.id.toString()} columnId={col.id}
                cellClass={winStatus && winningCells.includes(col.id) ? 'cell winning-cell': 'cell'}
                cellStates={cellStates} setCellStates={setCellStates} isFirstPlayer={isFirstPlayer}
                winStatus={winStatus} isReset={isReset}>
                </Cell>
              ))}
            </div>
          ))}
        </div>

        <PrimaryButton text="Reset" onClick={()=>handleReset()} allowDisabledFocus />

      </div>
    </div>
  );
}

export default App;
