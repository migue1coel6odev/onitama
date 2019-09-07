export default {
  wrapper: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute"
  },
  cards: {
    display: "flex",
    justifyContent: "center"
  },
  middleSection: {
    display: "flex",
    alignItems: "center"
  },
  whiteGone: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  blackGone: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  piecesGone: {
    display: "flex",
    flexDirection: "column",
    height: 532,
    width: 70
  },
  winner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 200,
    width: 400,
    backgroundColor: "white",
    border: "2px solid cyan"
  }
};
