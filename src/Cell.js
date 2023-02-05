import { useState } from "react";
import "./Cell.css";

const checkIfGameOver = (board) => {
  // Check if any row has the same value
  for (let i = 0; i < 3; i++) {
    if (
      board[i].columns[0].value !== "" &&
      board[i].columns[0].value === board[i].columns[1].value &&
      board[i].columns[1].value === board[i][2].value
    ) {
      return true;
    }
  }

  // Check if any column has the same value
  for (let i = 0; i < 3; i++) {
    if (
      board[0].columns[i].value !== "" &&
      board[0].columns[i].value === board[1].columns[i].value &&
      board[1].columns[i].value === board[2].columns[i].value
    ) {
      return true;
    }
  }

  // Check the first diagonal
  if (
    board[0].columns[0].value !== "" &&
    board[0].columns[0].value === board[1].columns[1].value &&
    board[1].columns[1].value === board[2].columns[2].value
  ) {
    return true;
  }

  // Check the second diagonal
  if (
    board[0].columns[2].value !== "" &&
    board[0].columns[2].value === board[1].columns[1].value &&
    board[1].columns[1].value === board[2].columns[0].value
  ) {
    return true;
  }

  return false;
};

function Cell({ columnId, cellState, setCellState }) {
  let isChecked = false;
  const [cellValue, setCellValue] = useState("");

  function updateValue() {
    if (!isChecked) {
      const rowNumber = Math.floor(columnId / 10);
      const index = cellState[rowNumber - 1].columns.findIndex(
        (column) => column.id === columnId
      );
      const value = cellState[rowNumber - 1].columns[index].value;
      if (!value) {
        setCellValue("X");
        const updatedState = JSON.parse(JSON.stringify(cellState));
        updatedState[rowNumber - 1].columns[index].value = "X";
        setCellState(updatedState);

        const status = checkIfGameOver(updatedState);
        if(status) {
            alert(status);
        }

      }
    }
  }

  return (
    <div className="cell" onClick={() => updateValue()}>
      {cellValue}
    </div>
  );
}

export default Cell;
