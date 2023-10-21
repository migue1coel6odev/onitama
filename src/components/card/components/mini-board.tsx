import React from "react";
import styles from "./mini-board.styles";

const TableColumn = ({ move }) => (
  <td
    style={{
      ...styles.boardCell,
      ...(move ? (move === "main" ? styles.main : styles.move) : {})
    }}
  ></td>
);

const TableRow = ({ moves }) => {
  return (
    <tr>
      <TableColumn move={moves[0]} />
      <TableColumn move={moves[1]} />
      <TableColumn move={moves[2]} />
      <TableColumn move={moves[3]} />
      <TableColumn move={moves[4]} />
    </tr>
  );
};

type MiniBoardProps = {
  cardMoves: any;
  rotate: Boolean;
}

const MiniBoard = ({ cardMoves, rotate }: MiniBoardProps) => {

  return (
    <div style={{ ...styles.board, ...(rotate ? styles.rotate : {}) }}>
      <table>
        <tbody>
          <TableRow moves={cardMoves[0]} />
          <TableRow moves={cardMoves[1]} />
          <TableRow moves={cardMoves[2]} />
          <TableRow moves={cardMoves[3]} />
          <TableRow moves={cardMoves[4]} />
        </tbody>
      </table>
    </div>
  );
}

export default MiniBoard;
