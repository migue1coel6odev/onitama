import React from "react";

import styles from "./card.styles";
import MiniBoard from "./components/mini-board";

class Card extends React.Component {
  render() {
    const {
      rotate,
      clickable,
      onClick,
      id,
      selected,
      card,
      isJoker = false
    } = this.props;
    return (
      <div
        style={{
          ...styles.card,
          ...(isJoker ? styles.joker : {}),
          ...(clickable ? styles.clickable : {}),
          ...(selected ? styles.selected : {})
        }}
        onClick={(clickable && (() => onClick(id, card))) || (() => {})}
      >
        <MiniBoard cardMoves={card} rotate={rotate} />
      </div>
    );
  }
}

export default Card;
