import React from "react";
import King from "../../assets/king";
import Pawn from "../../assets/pawn";
import styles from "./piece.styles";

type PieceProps = {
  isKing?: boolean;
  color: string;
}

const Piece = ({ isKing = false, color }: PieceProps) => {

  return <div style={styles.piece}>
    {(isKing && <King color={color} />) || <Pawn color={color} />}
  </div>
}
export default Piece;
