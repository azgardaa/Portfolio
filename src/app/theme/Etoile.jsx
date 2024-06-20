import React, { useEffect, useState } from 'react';

const Etoile = ({ isMoving, isTwinkling }) => {
  const [position, setPosition] = useState({ top: Math.random() * window.innerHeight, left: Math.random() * window.innerWidth });
  const [visible, setVisible] = useState(true);
  const [size, setSize] = useState(Math.floor(Math.random() * 3) + 1);
  const [windowW, setWindowW] = useState(window.innerWidth);
  const [windowH, setWindowH] = useState(window.innerHeight);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowW(window.innerWidth);
      setWindowH(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMoving && isTwinkling) {
      const cycleStar = () => {
        setCycle((prevCycle) => prevCycle + 1);
      };
      const intervalId = setInterval(cycleStar, Math.random() * 2000 + 2000); 
      return () => clearInterval(intervalId);
    }
  }, [isMoving, isTwinkling]);

  useEffect(() => {
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
      }, 2000); 
    }
  }, [cycle]);

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



