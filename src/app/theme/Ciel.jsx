// src/app/theme/Ciel.jsx
"use client"; // Indique que ce composant est un composant côté client

import React from 'react';
import Etoile from './Etoile';

const Ciel = () => {
  const stars = Array.from({ length: 200 }, (_, index) => {
    if (index < 35) {
      // 20 étoiles mobiles et scintillantes
      return { id: index, isMoving: true, isTwinkling: true };
    } else if (index < 70) {
      // 15 étoiles statiques et scintillantes
      return { id: index, isMoving: false, isTwinkling: true };
    } else {
      // 65 étoiles statiques et non scintillantes
      return { id: index, isMoving: false, isTwinkling: false };
    }
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black overflow-hidden">
      {stars.map((star) => (
        <Etoile key={star.id} isMoving={star.isMoving} isTwinkling={star.isTwinkling} />
      ))}
    </div>
  );
};

export default Ciel;


