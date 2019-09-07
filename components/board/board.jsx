import React from "react";

import styles from "./board.styles";

const getCardAvailableCells = ({ cardInfo, whitePlaying }) => {
  let result = [];
  const newCardInfo = [...cardInfo];
  if (!whitePlaying) {
    newCardInfo.reverse();
  }
  newCardInfo.map((elem, index) => {
    return elem.map((item, ind) => {
      if (!(index === 2 && ind === 2)) {
        if (item) {
          result.push({
            y: 2 - index,
            x: -(2 - ind)
          });
        }
      }
    });
  });
  return result;
};

const getAvailableMoves = ({
  whitePlaying,
  selectedCell,
  cardInfo,
  piecesBlack,
  piecesWhite
}) => {
  let newPiecesWhite = [...piecesWhite];
  let newPiecesBlack = [...piecesBlack];
  const availableCells = getCardAvailableCells({ cardInfo, whitePlaying });
  if (whitePlaying) {
    availableCells.map((elem, ind) => {
      const y = selectedCell.row - elem.y - 1;
      const x = selectedCell.column + elem.x - 1;
      if (y >= 0 && y < 5 && x >= 0 && x < 5 && !newPiecesWhite[y][x]) {
        newPiecesWhite[y][x] = "paint";
      }
    });
  } else {
    availableCells.map((elem, ind) => {
      const y = selectedCell.row - elem.y - 1;
      const x = selectedCell.column - elem.x - 1;
      if (y >= 0 && y < 5 && x >= 0 && x < 5 && !newPiecesBlack[y][x]) {
        newPiecesBlack[y][x] = "paint";
      }
    });
  }
  return {
    newPiecesBlack,
    newPiecesWhite
  };
};

const TableColumn = ({
  black,
  white,
  whitePlaying,
  hasCardSelected,
  onCellClick,
  row,
  column,
  selectedCell,
  onMoveAction
}) => {
  const isToPaint = black === "paint" || white === "paint";
  const actionable =
    !isToPaint && hasCardSelected && (whitePlaying ? white : black);
  const selected = selectedCell.row === row && selectedCell.column === column;
  return (
    <td
      style={{
        ...styles.boardCell,
        ...(isToPaint ? styles.paint : {}),
        ...(selected ? styles.selected : {}),
        ...(hasCardSelected
          ? whitePlaying
            ? white
              ? styles.clickableCell
              : {}
            : black
            ? styles.clickableCell
            : {}
          : {})
      }}
      onClick={
        actionable
          ? () => onCellClick(row, column, actionable)
          : isToPaint
          ? () => onMoveAction(row, column)
          : () => {}
      }
    >
      {isToPaint ? (whitePlaying ? black : white) : black || white}
    </td>
  );
};

const TableRow = ({
  pieces,
  whitePlaying,
  hasCardSelected,
  onCellClick,
  id,
  selectedCell,
  onMoveAction
}) => {
  return (
    <tr>
      <TableColumn
        row={id}
        column={1}
        black={pieces[0][0]}
        white={pieces[1][0]}
        whitePlaying={whitePlaying}
        hasCardSelected={hasCardSelected}
        onCellClick={onCellClick}
        selectedCell={selectedCell}
        onMoveAction={onMoveAction}
      />
      <TableColumn
        row={id}
        column={2}
        black={pieces[0][1]}
        white={pieces[1][1]}
        whitePlaying={whitePlaying}
        hasCardSelected={hasCardSelected}
        onCellClick={onCellClick}
        selectedCell={selectedCell}
        onMoveAction={onMoveAction}
      />
      <TableColumn
        row={id}
        column={3}
        black={pieces[0][2]}
        white={pieces[1][2]}
        whitePlaying={whitePlaying}
        hasCardSelected={hasCardSelected}
        onCellClick={onCellClick}
        selectedCell={selectedCell}
        onMoveAction={onMoveAction}
      />
      <TableColumn
        row={id}
        column={4}
        black={pieces[0][3]}
        white={pieces[1][3]}
        whitePlaying={whitePlaying}
        hasCardSelected={hasCardSelected}
        onCellClick={onCellClick}
        selectedCell={selectedCell}
        onMoveAction={onMoveAction}
      />
      <TableColumn
        row={id}
        column={5}
        black={pieces[0][4]}
        white={pieces[1][4]}
        whitePlaying={whitePlaying}
        hasCardSelected={hasCardSelected}
        onCellClick={onCellClick}
        selectedCell={selectedCell}
        onMoveAction={onMoveAction}
      />
    </tr>
  );
};

class Board extends React.Component {
  render() {
    const {
      piecesBlack,
      piecesWhite,
      whitePlaying,
      hasCardSelected,
      onCellClick,
      selectedCell,
      cardInfo,
      pieceSelected,
      onMoveAction
    } = this.props;
    let piecesBlackToUse = [...piecesBlack];
    let piecesWhiteToUse = [...piecesWhite];

    if (hasCardSelected && selectedCell) {
      const { newPiecesWhite, newPiecesBlack } = getAvailableMoves({
        whitePlaying,
        selectedCell,
        cardInfo,
        piecesBlack,
        piecesWhite
      });
      piecesBlackToUse = newPiecesBlack;
      piecesWhiteToUse = newPiecesWhite;
    }
    return (
      <div style={styles.board}>
        <table>
          <tbody>
            <TableRow
              id={1}
              pieces={[piecesBlackToUse[0], piecesWhiteToUse[0]]}
              whitePlaying={whitePlaying}
              hasCardSelected={hasCardSelected}
              onCellClick={onCellClick}
              selectedCell={selectedCell}
              pieceSelected={pieceSelected}
              cardInfo={cardInfo}
              onMoveAction={onMoveAction}
            />
            <TableRow
              id={2}
              pieces={[piecesBlackToUse[1], piecesWhiteToUse[1]]}
              whitePlaying={whitePlaying}
              hasCardSelected={hasCardSelected}
              onCellClick={onCellClick}
              selectedCell={selectedCell}
              pieceSelected={pieceSelected}
              cardInfo={cardInfo}
              onMoveAction={onMoveAction}
            />
            <TableRow
              id={3}
              pieces={[piecesBlackToUse[2], piecesWhiteToUse[2]]}
              whitePlaying={whitePlaying}
              hasCardSelected={hasCardSelected}
              onCellClick={onCellClick}
              selectedCell={selectedCell}
              pieceSelected={pieceSelected}
              cardInfo={cardInfo}
              onMoveAction={onMoveAction}
            />
            <TableRow
              id={4}
              pieces={[piecesBlackToUse[3], piecesWhiteToUse[3]]}
              whitePlaying={whitePlaying}
              hasCardSelected={hasCardSelected}
              onCellClick={onCellClick}
              selectedCell={selectedCell}
              pieceSelected={pieceSelected}
              cardInfo={cardInfo}
              onMoveAction={onMoveAction}
            />
            <TableRow
              id={5}
              pieces={[piecesBlackToUse[4], piecesWhiteToUse[4]]}
              whitePlaying={whitePlaying}
              hasCardSelected={hasCardSelected}
              onCellClick={onCellClick}
              selectedCell={selectedCell}
              pieceSelected={pieceSelected}
              cardInfo={cardInfo}
              onMoveAction={onMoveAction}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
