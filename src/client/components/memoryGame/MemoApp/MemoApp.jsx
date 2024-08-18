import React, { useEffect, useState } from "react";
import MemoBoard from "../MemoBoard/MemoBoard";
import "./memoApp.css";

function MemoApp() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(4);
  const [isTimeUp, setIsTimeUp] = useState(false); // État pour vérifier si le temps est écoulé

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
        setFlippedIndices([]);
      }
      setTimeout(() => setFlippedIndices([]), 1000);

      setMoves(moves + 1);
    }
  }, [flippedIndices]);

  // Gestion du chronomètre par décrémentation
  useEffect(() => {
    let timer;
    if (time > 0 && !isGameOver && !isTimeUp) {
      // Le temps décrémente tant qu'il n'est pas écoulé, que le jeu n'est pas terminé, et que le temps n'est pas épuisé
      timer = setInterval(() => setTime(time - 1), 1000);
    } else if (time === 0 && !isGameOver && !isTimeUp) {
      // Si le temps est écoulé, on déclenche la fin du jeu
      handleTimeUp();
    }
    return () => clearInterval(timer); // Nettoyage du timer pour éviter des bugs
  }, [time, isGameOver, isTimeUp]);

  const handleWin = () => {
    const winAudio = new Audio("/2363.mp3"); // Remplace par le chemin vers ton fichier son de victoire
    winAudio.play(); // Joue le signal sonore lorsque le joueur gagne
  };

  useEffect(() => {
    if (matchedIndices.length === cards.length && cards.length > 0) {
      setIsGameOver(true);
      handleWin(); // Appelle la fonction pour gérer la victoire, incluant le son
    }
  }, [matchedIndices]);

  const initializeGame = () => {
    const symbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍍", "🥝", "🥭"];
    const selectedSymbols = symbols.slice(0, difficulty);
    const cardSet = [...selectedSymbols, ...selectedSymbols].sort(
      () => Math.random() - 0.5
    );
    setCards(cardSet);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setMoves(0);
    setIsGameOver(false);
    setIsTimeUp(false); // Réinitialise l'état d'expiration du temps
    setTime(difficulty * 15); // Le temps dépend du niveau de difficulté (par exemple, 4 * 30 = 120 secondes)
  };

  const handleCardClick = (index) => {
    if (
      flippedIndices.length < 2 &&
      !flippedIndices.includes(index) &&
      !matchedIndices.includes(index)
    ) {
      const clickSound = new Audio("/2038.mp3"); // Remplace par le chemin vers ton fichier son de clic
      clickSound.play(); // Joue le son à chaque clic de carte

      setFlippedIndices([...flippedIndices, index]);
    }
  };

  // Fonction appelée lorsque le temps est écoulé
  const handleTimeUp = () => {
    setIsTimeUp(true);
    const audio = new Audio("/1313.mp3"); // Remplace par le chemin vers ton fichier son
    audio.play(); // Joue le signal sonore lorsque le temps est épuisé
  };

  const handleRestart = () => {
    initializeGame();
  };

  // Gestion du changement de difficulté
  const handleChangeDifficulty = (e) => {
    setDifficulty(Number(e.target.value));
  };

  return (
    <div className="">
      <header className="game-header">
        <h1>Bienvenue au Jeu de Mémoire!</h1>
        <p>Choisissez votre niveau de difficulté et commencez à jouer!</p>
      </header>

      <div className="memo-game-board">
        <div className="play-info">
          <div className="score">
            <p>Moves: {moves}</p>
            <p>Time: {time}s</p> {/* Affichage du temps restant */}
          </div>

          <button className="reset-button" onClick={handleRestart}>
            Réinitialiser
          </button>
        </div>

        {/* Ajouter une sélection de difficulté ici */}
        <div className="difficulty-selector">
          <label htmlFor="difficulty">Niveau de Difficulté : </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={handleChangeDifficulty}
            className={`difficulty-dropdown `}
          >
            <option value={4}>🍏 Facile</option>
            <option value={6}>🍊 Moyen</option>
            <option value={8}>🍇 Difficile</option>
          </select>
        </div>

        {(isGameOver || isTimeUp) && ( // Si le jeu est terminé ou si le temps est écoulé, afficher l'overlay
          <div className="memo-overlay">
            <div className="memo-overlay-content">
              <h2>{isGameOver ? "You Won!" : "Time's Up!"}</h2>{" "}
              {/* Affichage du message selon l'état */}
              <button className="memo-play-btn" onClick={handleRestart}>
                Play Again
              </button>{" "}
              {/* Bouton pour recommencer */}
            </div>
          </div>
        )}
        <MemoBoard
          cards={cards}
          flippedIndices={flippedIndices}
          matchedIndices={matchedIndices}
          onCardClick={handleCardClick}
        />
      </div>
    </div>
  );
}

export default MemoApp;
