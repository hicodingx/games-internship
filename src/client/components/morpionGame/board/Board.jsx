import React, { useEffect, useState } from "react";
import Square from "../square/Square";
import "./board.css"; // Assurez-vous d'importer les styles CSS

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [difficulty, setDifficulty] = useState("easy"); // État pour la difficulté de l'IA
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [message, setMessage] = useState("");

  // Réinitialiser le jeu lorsque la difficulté change uniquement si des cases sont cochées
  useEffect(() => {
    if (isGameInProgress && squares.some((square) => square !== null)) {
      resetGame();
    }
  }, [difficulty]);

  // Vérifiez si le jeu est terminé

  // Définir les fonctions avant le return

  // Assurez-vous que le fichier audio existe dans le bon chemin
  const playSound = () => {
    const audio = new Audio("/2038.mp3"); // Chemin relatif à partir du dossier public
    audio.play();
  };

  const playEndSound = () => {
    const audio = new Audio("/1313.mp3"); // Chemin relatif à partir du dossier public
    audio.play();
  };

  // Fonction pour jouer le son lorsque le jeu est réinitialisé
  const playResetSound = () => {
    const audio = new Audio("/2363.mp3"); // Chemin relatif à partir du dossier public
    audio.play();
  };

  // Fonction pour calculer le gagnant
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  // Fonction pour choisir un coup aléatoire
  const getRandomMove = (squares) => {
    const emptySquares = squares
      .map((value, index) => (value === null ? index : null))
      .filter((val) => val !== null);
    if (emptySquares.length > 0) {
      return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }
    return null;
  };

  // Fonction pour une stratégie moyenne (ex: bloquer les coups gagnants)
  const getMediumMove = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = "🍉"; // Simulez un coup pour la pastèque
        if (calculateWinner(squares) === "🍉") {
          squares[i] = null;
          return i;
        }
        squares[i] = null; // Annulez le coup
      }
    }

    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = "🍎"; // Simulez un coup pour la pomme
        if (calculateWinner(squares) === "🍎") {
          squares[i] = null;
          return i;
        }
        squares[i] = null; // Annulez le coup
      }
    }

    return getRandomMove(squares);
  };

  // Fonction pour une stratégie difficile (ex: algorithme Minimax)
  const getBestMove = (squares) => {
    const minimax = (squares, depth, isMaximizing) => {
      const winner = calculateWinner(squares);
      if (winner === "🍉") return 10 - depth;
      if (winner === "🍎") return depth - 10;
      if (!squares.includes(null)) return 0; // Égalité

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < squares.length; i++) {
          if (squares[i] === null) {
            squares[i] = "🍉"; // Maximisation pour la pastèque (système)
            let score = minimax(squares, depth + 1, false);
            squares[i] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < squares.length; i++) {
          if (squares[i] === null) {
            squares[i] = "🍎"; // Minimisation pour la pomme (joueur)
            let score = minimax(squares, depth + 1, true);
            squares[i] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    };

    let bestMove = null;
    let bestScore = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = "🍉"; // Testez ce coup pour la pastèque (système)
        let score = minimax(squares, 0, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove !== null ? bestMove : getRandomMove(squares);
  };

  // Trouver le meilleur coup pour le système en fonction de la difficulté
  const findBestMove = (squares) => {
    const difficultyStrategies = {
      easy: getRandomMove,
      medium: getMediumMove,
      hard: getBestMove,
    };
    const strategy = difficultyStrategies[difficulty];
    return strategy(squares);
  };

  // Fonction pour vérifier si une case est sur une diagonale
  const isDiagonal = (index) => {
    const diagonal1 = [0, 4, 8];
    const diagonal2 = [2, 4, 6];
    return diagonal1.includes(index) || diagonal2.includes(index);
  };

  // Fonction pour vérifier si la partie est nulle (partie vide)
  const isTie = (squares) => {
    return (
      squares.every((square) => square !== null) && !calculateWinner(squares)
    );
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    const tie = isTie(squares);
    if (winner) {
      setIsGameInProgress(false);
      setMessage(
        winner === "🍎"
          ? "Félicitations, vous avez gagné !"
          : "Oooopss vous avez perdu !"
      );
      setShowOverlay(true);
      playEndSound();
    } else if (tie) {
      setIsGameInProgress(false);
      setMessage("Partie vide !");
      setShowOverlay(true);
      playEndSound();
    } else if (
      !isGameInProgress &&
      squares.every((square) => square === null)
    ) {
      setIsGameInProgress(true); // Démarre le jeu
    }
  }, [squares, isGameInProgress]);

  // Gérer le clic sur une case
  const handleClick = (i) => {
    // Assurez-vous que le jeu est en cours et que la case cliquée est vide
    if (isGameInProgress && !squares[i] && !calculateWinner(squares)) {
      const squaresCopy = squares.slice();
      squaresCopy[i] = "🍎"; // Le joueur place une pomme
      setSquares(squaresCopy);
      setXIsNext(false); // Passe le tour au système
      playSound(); // Joue le son du coup du joueur

      // Le système joue après un court délai
      setTimeout(() => {
        if (!calculateWinner(squaresCopy) && squaresCopy.includes(null)) {
          const bestMove = findBestMove(squaresCopy, difficulty);
          if (bestMove !== null) {
            squaresCopy[bestMove] = "🍉"; // Le système place une pastèque
            setSquares([...squaresCopy]); // Utilisez une copie de squaresCopy pour déclencher un rerender
            setXIsNext(true);
            playSound();
          }
        }
      }, 500); // Délai avant le coup du système
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setIsGameInProgress(false);
    setShowOverlay(false);

    // playResetSound();
  };

  const Status = () => {
    const winner = calculateWinner(squares);
    if (!winner)
      return (
        <div className="status">Prochain Joueur: {xIsNext ? "🍎" : "🍉"}</div>
      );

    return (
      <div className="status">Prochain Joueur: {xIsNext ? "🍎" : "🍉"}</div>
    );
  };

  // Overlay affiché lorsqu'il y a un gagnant
  const Overlay = () => {
    const winner = calculateWinner(squares);

    if (!showOverlay) return null;

    if (!winner) {
      return (
        <div className="overlay">
          <div className="message-container">
            <div className="message">{message}</div>
            <div className="end-img">
              <img className="null-part" src="./over.png" alt="" />
            </div>
            <button className="reset-button" onClick={resetGame}>
              Réinitialiser
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="overlay">
          <div className="message-container">
            <div className="message">{message}</div>
            {winner === "🍎" ? (
              <div className="end-img">
                <img className="null-part" src="./gift.jpg" alt="" />
              </div>
            ) : (
              <div className="end-img">
                <img className="null-part" src="./sorry.gif" alt="" />
              </div>
            )}
            <button className="reset-button" onClick={resetGame}>
              Réinitialiser
            </button>
          </div>
        </div>
      );
    }
  };

  // Fonction pour changer le niveau de difficulté
  const handleDifficultyChange = (event) => {
    // Permet le changement de difficulté uniquement si aucune case n'est cochée
    if (!isGameInProgress || squares.every((square) => square === null)) {
      setDifficulty(event.target.value);
    }
  };

  // Fonction pour afficher chaque case avec une classe conditionnelle
  const renderSquare = (i) => {
    const isDiagonalClass = isDiagonal(i) ? " diagonal" : "";
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
        className={`square ${isDiagonalClass}`} // Appliquer la classe conditionnelle
      />
    );
  };

  return (
    <div>
      <Status />
      <div className="board-container">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className="reset-button" onClick={resetGame}>
          Réinitialiser
        </button>
        {/* Ajouter une sélection de difficulté ici */}
        <div className="difficulty-selector">
          <label htmlFor="difficulty">Niveau de Difficulté : </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={handleDifficultyChange}
            disabled={
              isGameInProgress && !squares.every((square) => square === null)
            }
            className={`difficulty-dropdown ${
              isGameInProgress && !squares.every((square) => square === null)
                ? "disabled"
                : ""
            }`}
          >
            <option value="easy">🍏 Facile</option>
            <option value="medium">🍊 Moyen</option>
            <option value="hard">🍇 Difficile</option>
          </select>
        </div>
      </div>

      {showOverlay && <Overlay />}
    </div>
  );
};

export default Board;
