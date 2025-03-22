import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

interface DraggableProps {
  children: ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - startPos.current.x,
        y: e.clientY - startPos.current.y,
      });
    },
    [isDragging]
  );

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove]);

  return (
    <div
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  );
};

export default Draggable;
