"use client"; // Indique que ce composant est un composant côté client

import React from 'react';
import Etoile from './Etoile';

const Ciel = () => {
  const stars = Array.from({ length: 150 }, (_, index) => ({
    id: index,
  }));

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black overflow-hidden">
      {stars.map((star) => (
        <Etoile key={star.id} />
      ))}
    </div>
  );
};

export default Ciel;

