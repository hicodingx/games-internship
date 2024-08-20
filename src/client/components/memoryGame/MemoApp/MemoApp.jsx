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
  const [isStarted, setIsStarted] = useState(false);
  const [end, setEnd] = useState(false);

  // useEffect(() => {
  //   const processGame = () => {
  //     initializeGame();
  //   };
  //   isStarted && processGame;
  // }, [isStarted]);

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

  useEffect(() => {
    initializeGame(); // Initialize the game on component mount
  }, [difficulty]);

  // Gestion du chronomètre par décrémentation
  useEffect(() => {
    let timer;
    if (isStarted && time > 0 && !isGameOver) {
      // Le temps décrémente tant qu'il n'est pas écoulé, que le jeu n'est pas terminé, et que le temps n'est pas épuisé
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isStarted && time === 0 && !isGameOver) {
      // Si le temps est écoulé, on déclenche la fin du jeu
      handleTimeUp();
    }
    return () => clearInterval(timer); // Nettoyage du timer pour éviter des bugs
  }, [time, isStarted, isGameOver]);

  // console.log(`timer => ${time}, game =>${isGameOver}, issta => ${isStarted}`);

  const handleWin = () => {
    setIsStarted(false);
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
    setEnd(false);
    setCards(cardSet);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setMoves(0);
    setIsGameOver(false);
    setIsTimeUp(false); // Réinitialisation de `isTimeUp` à `false`
    setTime(difficulty * 8); // Temps dépendant du niveau de difficulté
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
    setIsStarted(false);
    const audio = new Audio("/1313.mp3"); // Remplace par le chemin vers ton fichier son
    audio.play(); // Joue le signal sonore lorsque le temps est épuisé
  };

  // Fonction de redémarrage du jeu
  const handleRestart = () => {
    initializeGame(); // Réinitialise le jeu
  };

  // Gestion du changement de difficulté
  const handleChangeDifficulty = (e) => {
    setDifficulty(Number(e.target.value));
    // initializeGame(); // Réinitialise le jeu avec la nouvelle difficulté
  };

  const handleStart = () => {
    setIsStarted(true);
    // initializeGame();
  };

  const Overlay = () => {
    if ((isGameOver || isTimeUp) && !end) {
      return (
        <div className="overlay">
          <div className="message-container">
            {isGameOver ? (
              <div className="message">Félicitation!, vous avez gagné</div>
            ) : (
              <div className="message">Perdu!</div>
            )}

            {isGameOver ? (
              <div className="end-img">
                <img className="null-part" src="./gift.jpg" alt="" />
              </div>
            ) : (
              <div className="end-img">
                <img className="null-part" src="./sorry.gif" alt="" />
              </div>
            )}

            {/* <button className="reset-button" onClick={resetGame}>
                Réinitialiser
              </button> */}
            <div className="replay-end-container">
              <button className="memo-play-btn" onClick={handleRestart}>
                Play Again
              </button>
              <button className="memo-play-btn end" onClick={handleRestart}>
                Terminer
              </button>
            </div>
          </div>
        </div>
      );
    } else return null;
  };

  return (
    <div className="">
      <header className="game-header">
        <h1>Bienvenue au Jeu de Mémoire!</h1>
        <p>Choisissez votre niveau de difficulté et commencez à jouer!</p>
      </header>

      <div className="memo-game-board">
        <div className="time-counter-container">
          <p>{time} s</p> {/* Affichage du temps restant */}
        </div>
        <div className="play-info">
          <div className="score">
            <p>Moves: {moves}</p>
          </div>

          <button
            className={`reset-button memo  ${isStarted ? "disabled" : ""}`}
            onClick={handleRestart}
            disabled={isStarted}
          >
            Réinitialiser
          </button>
        </div>

        {/* Ajouter une sélection de difficulté ici */}
        <div className="difficulty-selector memo">
          <label htmlFor="difficulty">Niveau de Difficulté : </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={handleChangeDifficulty}
            disabled={isStarted}
            className={`difficulty-dropdown ${isStarted ? "disabled" : ""}`}
          >
            <option value={4}>🍏 Facile</option>
            <option value={6}>🍊 Moyen</option>
            <option value={8}>🍇 Difficile</option>
          </select>
        </div>

        <div className="launch-btn-container">
          <button
            className={`reset-button memo launch ${
              isStarted ? "disabled" : ""
            }`}
            onClick={handleStart}
            disabled={isStarted}
          >
            Jouer
          </button>
        </div>

        {/*  */}
        <Overlay />
        <MemoBoard
          cards={cards}
          flippedIndices={flippedIndices}
          matchedIndices={matchedIndices}
          onCardClick={handleCardClick}
          isStarted={isStarted} // Ajout de l'état isStarted
        />
      </div>
    </div>
  );
}

export default MemoApp;
