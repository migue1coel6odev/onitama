import React from "react";
import styles from "./card.styles";
import MiniBoard from "./components/mini-board";
import { Card } from "./cards.data";

type CardProps = {
  rotate: boolean;
  clickable: boolean;
  onClick: (id: string, card: Card) => void;
  id: string;
  selected: boolean;
  card: Card;
  isJoker?: boolean;
}

const Card = ({
  rotate,
  clickable,
  onClick,
  id,
  selected,
  card,
  isJoker = false
}: CardProps) => {

  return <div
    style={{
      ...styles.card,
      ...(isJoker ? styles.joker : {}),
      ...(clickable ? styles.clickable : {}),
      ...(selected ? styles.selected : {})
    }}
    onClick={(clickable && (() => onClick(id, card))) || (() => { })}
  >
    <MiniBoard cardMoves={card} rotate={rotate} />
  </div>
}

export default Card;
