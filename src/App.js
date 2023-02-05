import logo from "./logo.svg";
import "./App.css";
import Cell from "./Cell";
import { useState } from "react";

function App() {
  let cellData = [
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

  const [cellState, setCellState] = useState(cellData);
  const [isMachinePlayer, setIsMachinePlayer] = useState(false);

  return (
    <div className="App">
      <div className="App-content">
        
        <div className="mb-20">
          {isMachinePlayer ? (<div>Machine Turns Now</div>):(<div>Your Turns Now</div>)}
        </div>

        <div className="board">
          {cellData.map((row) => (
            <div className="row" key={row.rowId}>
              {row.columns.map((col) => (
                <Cell key={col.id} columnId={col.id} cellState={cellState} setCellState={setCellState}></Cell>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
