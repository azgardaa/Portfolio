"use client"

import { useCallback, useEffect, useState } from "react";
import { loadFull } from 'tsparticles';
import Particles, { initParticlesEngine } from "@tsparticles/react"
import ParticlesConfig from './config'; // Assurez-vous que ce fichier contient votre configuration valide

const ParticlesBack = () => {
    const [ init, setInit ] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

  return (
    <div id="ParticleBackground" className='z-1'>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        init={init}
        options={ParticlesConfig}
        height="100vh"
        width="100vw"
      />
    </div>
  );
};

export default ParticlesBack;

