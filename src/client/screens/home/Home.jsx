import React, { useEffect } from "react";
import "./home.css";
import Cards from "../../components/cards/Cards";
import { IoPlayForward } from "react-icons/io5";

import Modal from "../../components/modal/Modal";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Typewriter from "typewriter-effect";

export default function Home() {
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });
  const navigate = useNavigate();
  // useEffect(() => {
  //   // Créer des éléments pour l'animation
  //   const container = document.querySelector(".animation-container");
  //   for (let i = 0; i < 50; i++) {
  //     const shape = document.createElement("div");
  //     shape.className = "shape";
  //     shape.style.backgroundColor = Math.random() > 0.5 ? "blue" : "red"; // Couleur aléatoire
  //     shape.style.left = `${Math.random() * 100}vw`; // Position horizontale aléatoire
  //     shape.style.animationDelay = `${Math.random() * 5}s`; // Délai aléatoire
  //     container.appendChild(shape);
  //   }
  // }, []);
  return (
    <div className="app-container">
      <Modal />

      <div className="h-container">
        <div className="ms-container">
          <div className="s-title">Game Center</div>

          <div className="h2-b-title">
            Detendez-vous avec des jeux qui vous amusent !
          </div>

          <div className="h-desc-title">
            Sur Cette platform, nous vous proposons de jouer au jeux de Morpion.
            Vous pouvez jouer par niveau de difficulté.
          </div>

          <div className="desktop-games-btn">
            <button className="play-btn" onClick={() => navigate("/morpion")}>
              <div className="btn-title">Jouer au Morpion</div>

              <div className="react-icon">
                <IoPlayForward size={20} />
              </div>
            </button>

            <button className="play-btn" onClick={() => navigate("/memo")}>
              <div className="btn-title">Jeux de Mémoire</div>

              <div className="react-icon">
                <IoPlayForward size={20} />
              </div>
            </button>
          </div>

          <div ref={ref} className="dyn-desc">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(500)
                  .typeString("Bienvenue sur notre platforme de divertissement")
                  .pauseFor(300)
                  .deleteAll(10)
                  .typeString(
                    '<p style="color: #27ae60;  fontSize: 24; font-weight: 600" > Jouer ici des jeux qui entraînent votre mémoire, </p>'
                  )
                  .typeString(
                    '<p> Je suis <span style="color: coral;"> Hippolyte Avoce</span> et je serai votre <span style="color: #27ae60; display: inline-block;">adversaire </span>  </p>'
                  )
                  .pauseFor(1000)
                  .start();
              }}
            />
          </div>
        </div>

        <div className="desktop-side-gif">
          <div className="gif-container">
            <img src="./gif.gif" alt="Jerry Gif" />
          </div>
        </div>
      </div>

      <div className="h-cards-sliders">
        <Cards />
      </div>

      <div className="mobile-memory-btn">
        <button className="play-btn" onClick={() => navigate("/memo")}>
          <div className="btn-title">Jeux de Mémoire</div>

          <div className="react-icon">
            <IoPlayForward size={20} />
          </div>
        </button>
      </div>
      {/* <div className="animation-container"></div>
      <Game /> */}
    </div>
  );
}