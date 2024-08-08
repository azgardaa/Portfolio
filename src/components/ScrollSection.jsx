import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  createContext,
} from "react";

export const ScrollSectionContext = createContext();

const ScrollSection = ({ children }) => {
  const sections = useRef([]);
  const isScrolling = useRef(false);
  const startY = useRef(0);
  const endY = useRef(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const scrollSensitivity = 120; // Adjust this value to change scroll sensitivity

  const disableScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const enableScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleScroll = useCallback(
    (deltaY) => {
      if (isScrolling.current) return;
      isScrolling.current = true;
      disableScroll();

      const newIndex =
        deltaY > 0 ? currentSectionIndex + 1 : currentSectionIndex - 1;

      if (newIndex >= 0 && newIndex < sections.current.length) {
        setCurrentSectionIndex(newIndex);
        sections.current[newIndex].scrollIntoView({
          behavior: "smooth",
        });
      }

      setTimeout(() => {
        isScrolling.current = false;
        enableScroll();
      }, 1000); // Adjust this timeout as needed
    },
    [currentSectionIndex, disableScroll, enableScroll]
  );

  const handleWheel = useCallback(
    (event) => {
      event.preventDefault();
      handleScroll(event.deltaY);
    },
    [handleScroll]
  );

  const handleTouchStart = useCallback((event) => {
    startY.current = event.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((event) => {
    event.preventDefault();
    endY.current = event.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const deltaY = startY.current - endY.current;
    if (Math.abs(deltaY) > scrollSensitivity) {
      handleScroll(deltaY);
    }
  }, [handleScroll, scrollSensitivity]);

  const scrollToSection = useCallback((index) => {
    if (index >= 0 && index < sections.current.length) {
      setCurrentSectionIndex(index);
      sections.current[index].scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <ScrollSectionContext.Provider
      value={{ scrollToSection, currentSectionIndex }}
    >
      <div>
        {React.Children.map(children, (child, index) => (
          <div
            ref={(el) => (sections.current[index] = el)}
            key={index}
            className="h-screen w-full"
          >
            {child}
          </div>
        ))}
      </div>
    </ScrollSectionContext.Provider>
  );
};

export default ScrollSection;
