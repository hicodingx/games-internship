import { IoClose } from "react-icons/io5";
import "./modal.css";
import { useState } from "react";

const Modal = () => {
  const [isclosed, setIsClosed] = useState(false);

  return (
    <div className={isclosed ? "modal closed" : "modal"}>
      <div
        className="modal-close-overlay"
        onClick={() => setIsClosed(true)}
      ></div>

      <div className="modal-content">
        <button className="modal-close-btn" onClick={() => setIsClosed(true)}>
          <IoClose className="react-icon" size={16} width={70} />
        </button>

        <div className="newsletter-img">
          <img
            src="./newsletter.png"
            alt="subscribe newsletter"
            className="news-img"
          />
        </div>

        <div className="newsletter">
          <form action="#">
            <div className="newsletter-header">
              <h3 className="newsletter-title">Subscrire au Journal de Jeu</h3>
              <p className="newsletter-desc">
                Souscrivez-vous à <b>Gamelot</b> pour &ecirc;tre informé de nos
                nouveaux jeux.
              </p>
            </div>

            <input
              type="email"
              name="email"
              id="email-id"
              className="email-field"
              placeholder="Email Address"
              required
            />

            {/* <button type="submit" className="btn-newsletter">
              Souscrire
            </button> */}
            <button
              className="btn-newsletter"
              onClick={() => setIsClosed(true)}
            >
              Souscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
