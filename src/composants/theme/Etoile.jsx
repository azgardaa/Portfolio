import React, { useEffect, useState, useRef } from 'react';

const Etoile = () => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(true);
  const size = useRef(Math.floor(Math.random() * 4) + 1); // Taille aléatoire entre 1 et 5 pixels

  useEffect(() => {
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    setPosition({ top: Math.random() * windowH, left: Math.random() * windowW });

    const cycleStar = () => {
      setVisible(false);
      const newPosX = Math.floor(Math.random() * windowW);
      const newPosY = Math.floor(Math.random() * windowH);
      setTimeout(() => {
        setPosition({ top: newPosY, left: newPosX });
        setVisible(true);
      }, 1000); // Temps pendant lequel l'étoile est invisible
    };

    const intervalId = setInterval(cycleStar, Math.random() * 40000 + 10000); // Cycle toutes les 1-5 secondes
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={`absolute rounded-full bg-white transition-opacity duration-1000 ease-in-out ${visible ? 'opacity-80' : 'opacity-0'}`}
      style={{
        width: `${size.current}px`,
        height: `${size.current}px`,
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    ></div>
  );
};

export default Etoile;
