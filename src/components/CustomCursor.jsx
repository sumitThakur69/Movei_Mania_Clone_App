import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      className="fixed w-6 h-6 rounded-full bg-white mix-blend-difference pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
      style={{ left: pos.x, top: pos.y }}
    />
  );
}
