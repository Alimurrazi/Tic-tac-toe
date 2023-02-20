import { useEffect, useState } from "react";
import "./Cell.css";

function Cell({ columnId, cellStates, setCellStates, isFirstPlayer, winStatus, cellClass }) {
  let isChecked = false;
  const [cellValue, setCellValue] = useState("");
  const [rowNo, setRowNo] = useState(1);
  const [indexNo, setIndexNo] = useState(0);

  function updateValue() {
    if (!isChecked && !winStatus) {
      const rowNumber = Math.floor(columnId / 10);
      const index = cellStates[rowNumber - 1].columns.findIndex(
        (column) => column.id === columnId
      );
      const value = cellStates[rowNumber - 1].columns[index].value;
      if (!value) {
        setRowNo(rowNumber);
        setIndexNo(index);
        if(isFirstPlayer) {
          setCellValue("X");
        } else {
          setCellValue("0");
        }
      }
    }
  }

  useEffect(()=>{
    const updatedState = JSON.parse(JSON.stringify(cellStates));
    updatedState[rowNo - 1].columns[indexNo].value = cellValue;
    setCellStates(updatedState);
  },[cellValue, indexNo, rowNo]);

  return (
    <div className={cellClass} onClick={() => updateValue()}>
      {cellValue}
    </div>
  );
}

export default Cell;
