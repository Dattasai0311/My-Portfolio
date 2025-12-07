import { useEffect, useState } from "react";

export const TypewriterText = ({ text, delay = 0, className }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 50);

      return () => clearInterval(intervalId);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return <span className={className}>{displayedText}</span>;
};
