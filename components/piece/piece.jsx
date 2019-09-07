import React from "react";
import King from "../../assets/king";
import Pawn from "../../assets/pawn";

import styles from "./piece.styles";

class Piece extends React.Component {
  render() {
    const { isKing = false, color } = this.props;
    return (
      <div style={styles.piece}>
        {(isKing && <King color={color} />) || <Pawn color={color} />}
      </div>
    );
  }
}

export default Piece;
