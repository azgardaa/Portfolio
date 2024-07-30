import React from "react";
import Typewriter from "typewriter-effect";

const TypewriterComponent = ({ strings, loop }) => {
  return (
    <div id="app" className="text-2xl md:text-4xl xl:text-7xl ">
      <Typewriter
        options={{
          loop: loop,
          autoStart: true, // Démarre automatiquement l'effet de machine à écrire
        }}
        onInit={(typewriter) => {
          strings.forEach((str) => {
            typewriter.typeString(str.text).pauseFor(str.pause);

            if (str.deleteAll) {
              typewriter.deleteAll();
            } else if (str.deleteChars) {
              typewriter.deleteChars(str.deleteChars);
            }
          });
          typewriter.start();
        }}
      />
    </div>
  );
};

export default TypewriterComponent;
