import { useEffect, useState } from "react";
import "./Cell.css";

function Cell({ columnId, cellStates, setCellStates, isFirstPlayer, winStatus, cellClass, isReset }) {
  const [cellValue, setCellValue] = useState("");
  const [rowNumber, setRowNumber] = useState(1);
  const [columnNumber, setColumnNumber] = useState(0);

  useEffect(()=>{
    if(isReset) {
      setCellValue("");
    }
  },[isReset]);

  function updateValue() {
    if (!winStatus) {
      const rowNo = Math.floor(columnId / 10);
      const index = cellStates[rowNo - 1].columns.findIndex(
        (column) => column.id === columnId
      );
      const value = cellStates[rowNo - 1].columns[index].value;
      if (!value) {
        setRowNumber(rowNo);
        setColumnNumber(index);
        if(isFirstPlayer) {
          setCellValue("X");
        } else {
          setCellValue("0");
        }
      }
    }
  }

  useEffect(()=>{
    const updatedState = [...cellStates];
    updatedState[rowNumber - 1].columns[columnNumber].value = cellValue;
    setCellStates(updatedState);
  },[cellValue, columnNumber, rowNumber]);

  return (
    <div className={cellClass} onClick={() => updateValue()}>
      {cellValue}
    </div>
  );
}

export default Cell;
