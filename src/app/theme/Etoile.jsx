import React, { useEffect, useState } from 'react';

const Etoile = ({ isMoving, isTwinkling }) => {
  const isBrowser = typeof window !== 'undefined';
  const [position, setPosition] = useState({ top: isBrowser ? Math.random() * window.innerHeight : 0, left: isBrowser ? Math.random() * window.innerWidth : 0 });
  const [visible, setVisible] = useState(true);
  const [size, setSize] = useState(Math.floor(Math.random() * 3) + 1); // Taille aléatoire entre 1 et 3 pixels
  const [windowW, setWindowW] = useState(isBrowser ? window.innerWidth : 0);
  const [windowH, setWindowH] = useState(isBrowser ? window.innerHeight : 0);
  const [cycle, setCycle] = useState(0); // État pour gérer le cycle de scintillement et de déplacement

  useEffect(() => {
    if (isBrowser) {
      const handleResize = () => {
        setWindowW(window.innerWidth);
        setWindowH(window.innerHeight);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isBrowser]);

  useEffect(() => {
    if (isBrowser && isMoving && isTwinkling) {
      const cycleStar = () => {
        setCycle((prevCycle) => prevCycle + 1);
      };
      const intervalId = setInterval(cycleStar, Math.random() * 2000 + 1000); // Cycle toutes les 1-3 secondes
      return () => clearInterval(intervalId);
    }
  }, [isMoving, isTwinkling, isBrowser]);

  useEffect(() => {
    if (isBrowser) {
      if (isTwinkling) {
        setVisible((v) => !v);
      }
      if (isMoving && cycle % 2 === 0) {
        setVisible(false);
        const newPosX = Math.floor(Math.random() * windowW);
        const newPosY = Math.floor(Math.random() * windowH);
        setTimeout(() => {
          setPosition({ top: newPosY, left: newPosX });
          setVisible(true);
        }, 1000); // Temps pendant lequel l'étoile est invisible
      }
    }
  }, [cycle, isMoving, isTwinkling, windowW, windowH, isBrowser]);

  return (
    <div
      className={`absolute rounded-full bg-white transition-opacity duration-1000 ease-in-out ${visible ? 'opacity-80' : 'opacity-0'}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    ></div>
  );
};

export default Etoile;
