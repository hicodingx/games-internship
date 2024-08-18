const getMediumMove = (squares) => {
  // Essayez de gagner
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = "🍉"; // Simulez un coup pour la pastèque (système)
      if (calculateWinner(squares) === "🍉") {
        squares[i] = null;
        return i;
      }
      squares[i] = null; // Annulez le coup
    }
  }

  // Bloquez le joueur
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = "🍎"; // Simulez un coup du joueur (pomme)
      if (calculateWinner(squares) === "🍎") {
        squares[i] = null;
        return i;
      }
      squares[i] = null; // Annulez le coup
    }
  }

  // Choisissez un coup aléatoire si aucune autre stratégie n'a été appliquée
  return getRandomMove(squares);
};
