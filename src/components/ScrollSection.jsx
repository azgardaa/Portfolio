import React, { useRef, useEffect, useState, useCallback } from "react";

const ScrollSection = ({ children }) => {
  const sectionRefs = useRef([]);
  const isScrolling = useRef(false);
  const startY = useRef(0);
  const endY = useRef(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const scrollSensitivity = 120; // Ajustez cette valeur pour changer la sensibilité du défilement

  const toggleScroll = useCallback((disable) => {
    document.body.style.overflow = disable ? "hidden" : "hidden";
  }, []);

  const handleScroll = useCallback(
    (deltaY) => {
      if (isScrolling.current) return;
      isScrolling.current = true;
      toggleScroll(true);

      const newIndex = Math.max(
        0,
        Math.min(
          sectionRefs.current.length - 1,
          currentSectionIndex + (deltaY > 0 ? 1 : -1)
        )
      );

      if (newIndex !== currentSectionIndex) {
        setCurrentSectionIndex(newIndex);
        sectionRefs.current[newIndex].scrollIntoView({
          behavior: "smooth",
        });
      }

      setTimeout(() => {
        isScrolling.current = false;
        toggleScroll(false);
      }, 1000); // Ajustez ce délai si nécessaire
    },
    [currentSectionIndex, toggleScroll]
  );

  const handleWheel = useCallback(
    (event) => {
      event.preventDefault();
      handleScroll(event.deltaY);
    },
    [handleScroll]
  );

  const handleTouch = useCallback(
    (event) => {
      switch (event.type) {
        case "touchstart":
          startY.current = event.touches[0].clientY;
          break;
        case "touchmove":
          endY.current = event.touches[0].clientY;
          break;
        case "touchend":
          const deltaY = startY.current - endY.current;
          if (Math.abs(deltaY) > scrollSensitivity) {
            handleScroll(deltaY);
          }
          break;
        default:
          break;
      }
    },
    [handleScroll, scrollSensitivity]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouch, { passive: false });
    window.addEventListener("touchmove", handleTouch, { passive: false });
    window.addEventListener("touchend", handleTouch, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchend", handleTouch);
    };
  }, [handleWheel, handleTouch]);

  // Utilisation de l'API IntersectionObserver pour détecter la section visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setCurrentSectionIndex(index);
            }
          }
        });
      },
      {
        threshold: 0.5, // Déclenche l'observation lorsque 50% de la section est visible
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      if (sectionRefs.current.length > 0) {
        sectionRefs.current.forEach((section) => {
          if (section) observer.unobserve(section);
        });
      }
    };
  }, []);

  return (
    <div>
      {React.Children.map(children, (child, index) => (
        <div
          ref={(el) => (sectionRefs.current[index] = el)}
          key={index}
          className="h-screen w-full z-10"
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ScrollSection;
