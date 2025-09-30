import { useState, useEffect } from "react";

const ChessBoardBackground = () => {
  const [size, setSize] = useState(80); // default

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      let newSize;
      if (width < 640) {
        newSize = 40; // HP kecil
      } else if (width < 1024) {
        newSize = 120; // tablet / laptop kecil
      } else {
        newSize = 160; // monitor gede
      }

      setSize(newSize);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const rows = Math.ceil(window.innerHeight / size);
  const cols = Math.ceil(window.innerWidth / size);

  return (
    <div
      className="absolute inset-0 grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        gridTemplateRows: `repeat(${rows}, ${size}px)`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const isDark = (Math.floor(i / cols) + (i % cols)) % 2 === 1;
        return (
          <div
            key={i}
            className="w-full h-full"
            style={{
              backgroundColor: isDark ? "#fff" : "#fff", // kotak tetep statis
              border: "1px solid #bbb",
              animation: "borderPulse 2.5s infinite alternate",
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        );
      })}
    </div>
  );
};
export default ChessBoardBackground;
