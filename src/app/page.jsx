"use client"

import React, { useCallback, useState } from "react";
import Board from "../components/board/board";
import Card from "../components/card/card";
import Piece from "../components/piece/piece";
import cards from "../components/card/cards.data";
import styles from "../components/index.styles";

const BlackKing = ({ color = "black" }) => <Piece isKing color={color} />;
BlackKing.displayName = "BlackKing";
const BlackPawn = ({ color = "black" }) => <Piece color={color} />;

const WhiteKing = ({ color = "red" }) => <Piece isKing color={color} />;
WhiteKing.displayName = "WhiteKing";
const WhitePawn = ({ color = "red" }) => <Piece color={color} />;

const getRandomCardNumber = max => Math.round(Math.random() * (max - 0) + 0);

const generateRandomCards = () => {
  const test = [...cards];
  const card2 = cards.splice(getRandomCardNumber(5), 1)[0];
  const card3 = cards.splice(getRandomCardNumber(4), 1)[0];
  const card4 = cards.splice(getRandomCardNumber(3), 1)[0];
  const card1 = cards.splice(getRandomCardNumber(2), 1)[0];

  //return [card1, card2, card3, card4];
  return test;
};

const cleanPaint = (black, white) => {
  const b = black.map(elem => {
    if (elem) {
      return elem.map(elem2 => {
        if (elem2 === "paint") {
          return null;
        } else {
          return elem2;
        }
      });
    }
    return [];
  });
  const w = white.map(elem => {
    if (elem) {
      return elem.map(elem2 => {
        if (elem2 === "paint") {
          return null;
        } else {
          return elem2;
        }
      });
    }
    return [];
  });
  return {
    b,
    w
  };
};

export default function Game() {
  const [state, setState] = useState({
    whitePlaying: true,
    hasCardSelected: false,
    cardInfo: {},
    selectedCell: {},
    blackCards: [cards[0], cards[1]],
    whiteCards: [cards[2], cards[3]],
    jokerCard: cards[4],
    piecesBlack: [
      [
        <BlackPawn />,
        <BlackPawn />,
        <BlackKing />,
        <BlackPawn />,
        <BlackPawn />
      ],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null]
    ],
    piecesWhite: [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [
        <WhitePawn />,
        <WhitePawn />,
        <WhiteKing />,
        <WhitePawn />,
        <WhitePawn />
      ]
    ],
    whitePiecesGone: [],
    blackPiecesGone: [],
    winner: null
  });


  const onCardSelection = useCallback((id, card) => {
    this.setState(() => ({
      hasCardSelected: true,
      cardInfo: {
        id,
        card
      }
    }));
  });

  const onCellClick = useCallback((row, column, isPiece) => {
    this.setState(() => ({
      pieceSelected: true,
      selectedCell: { row, column }
    }));
  });

  const onMoveAction = useCallback((row, column) => {
    const {
      piecesBlack,
      piecesWhite,
      selectedCell,
      whitePlaying,
      blackPiecesGone,
      whitePiecesGone,
      jokerCard,
      cardInfo,
      whiteCards,
      blackCards
    } = this.state;
    let whitePieces = [...piecesWhite];
    let blackPieces = [...piecesBlack];
    let oldPiece;
    if (whitePlaying) {
      oldPiece = whitePieces[selectedCell.row - 1][selectedCell.column - 1];
      whitePieces[selectedCell.row - 1][selectedCell.column - 1] = null;
      whitePieces[row - 1][column - 1] = oldPiece;
      if (blackPieces[row - 1][column - 1]) {
        blackPiecesGone.push(blackPieces[row - 1][column - 1]);
        if (blackPieces[row - 1][column - 1].type.displayName === "BlackKing") {
          this.setState(() => ({ winner: "white" }));
        }
        blackPieces[row - 1][column - 1] = null;
      }
    } else {
      oldPiece = blackPieces[selectedCell.row - 1][selectedCell.column - 1];
      blackPieces[selectedCell.row - 1][selectedCell.column - 1] = null;
      blackPieces[row - 1][column - 1] = oldPiece;
      if (whitePieces[row - 1][column - 1]) {
        whitePiecesGone.push(whitePieces[row - 1][column - 1]);
        if (whitePieces[row - 1][column - 1].type.displayName === "WhiteKing") {
          this.setState(() => ({ winner: "black" }));
        }
        whitePieces[row - 1][column - 1] = null;
      }
    }

    const newJokerCard = cardInfo.card;
    if (whitePlaying) {
      whiteCards[cardInfo.id - 3] = jokerCard;
    } else {
      blackCards[cardInfo.id - 1] = jokerCard;
    }

    this.setState(() => ({
      piecesWhite: whitePieces,
      hasCardSelected: false,
      whitePlaying: !whitePlaying,
      selectedCell: {},
      cardInfo: {},
      blackPiecesGone,
      whitePiecesGone,
      jokerCard: newJokerCard,
      whiteCards
    }));
  });

  const { b, w } = cleanPaint(state.piecesBlack, state.piecesWhite);

  return (
    <div style={styles.wrapper}>
      {state.winner && (
        <div
          style={styles.winner}
        >{`${winner.toUpperCase()} WON THE GAME `}</div>
      )}
      <div style={styles.cards}>
        <Card
          id={1}
          rotate
          clickable={!state.whitePlaying}
          onClick={onCardSelection}
          selected={state.cardInfo.id === 1}
          card={state.blackCards[0]}
        />
        <Card
          id={2}
          rotate
          clickable={!state.whitePlaying}
          onClick={onCardSelection}
          selected={state.cardInfo.id === 2}
          card={state.blackCards[1]}
        />
      </div>
      <div style={styles.middleSection}>
        <Card card={state.jokerCard} isJoker />
        <Board
          whitePlaying={state.whitePlaying}
          hasCardSelected={state.hasCardSelected}
          piecesBlack={[...b]}
          piecesWhite={[...w]}
          onCellClick={onCellClick}
          onMoveAction={onMoveAction}
          selectedCell={state.selectedCell}
          cardInfo={state.card}
        />
        <div style={styles.piecesGone}>
          <div style={styles.whiteGone}>
            {state.whitePiecesGone.map(elem => elem)}
          </div>
          <div style={styles.blackGone}>
            {state.blackPiecesGone.map(elem => elem)}
          </div>
        </div>
      </div>
      <div style={styles.cards}>
        <Card
          id={3}
          clickable={state.whitePlaying}
          onClick={onCardSelection}
          selected={state.cardInfo.id === 3}
          card={state.whiteCards[0]}
        />
        <Card
          id={4}
          clickable={state.whitePlaying}
          onClick={onCardSelection}
          selected={state.cardInfo.id === 4}
          card={state.whiteCards[1]}
        />
      </div>
    </div>
  );

}