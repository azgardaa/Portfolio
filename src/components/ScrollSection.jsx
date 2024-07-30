import React, { useRef, useEffect } from "react";

const ScrollSection = ({ children }) => {
  const sections = useRef([]);
  const isScrolling = useRef(false);
  const startY = useRef(0);
  const endY = useRef(0);

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  const handleScroll = (deltaY) => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    disableScroll();

    const currentSectionIndex = sections.current.findIndex(
      (section) =>
        section &&
        section.getBoundingClientRect().top >= 0 &&
        section.getBoundingClientRect().top < window.innerHeight / 2
    );

    if (deltaY > 0 && currentSectionIndex < sections.current.length - 1) {
      sections.current[currentSectionIndex + 1].scrollIntoView({
        behavior: "smooth",
      });
    } else if (deltaY < 0 && currentSectionIndex > 0) {
      sections.current[currentSectionIndex - 1].scrollIntoView({
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      isScrolling.current = false;
      enableScroll();
    }, 1000); // Adjust this timeout as needed
  };

  const handleWheel = (event) => {
    event.preventDefault();
    handleScroll(event.deltaY);
  };

  const handleTouchStart = (event) => {
    startY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    endY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const deltaY = startY.current - endY.current;
    handleScroll(deltaY);
  };

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
  }, []);

  return (
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
  );
};

export default ScrollSection;
