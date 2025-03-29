import { Parallax } from "react-scroll-parallax";
import Draggable from "./Draggable";

export interface ContentBoxType {
  text: string;
  link?: string;
  boxid: string;
  location:
    | {
        top: number;
        left: number;
      }
    | undefined;
}

const ContentBox: React.FC<{
  text: string;
  link?: string;
  boxno: string;
  location?: {
    left: number;
    top: number;
  };
  children?: React.ReactNode;
  zIndex: number;
  bringToFront: () => void;
}> = ({ text, boxno, location, zIndex, bringToFront }) => {
  const left = location?.left ?? 0;
  const top = location?.top ?? 0;

  return (
    <Draggable bringToFront={bringToFront} zIndex={zIndex}>
      <Parallax speed={10} className="parallax-box">
        <div
          className={`content-box ${boxno}`}
          style={{
            left: `${left}rem`,
            top: `${top}rem`,
          }}
          onMouseDown={bringToFront}
        >
          <h2>Subtitle</h2>
          <p>{text}</p>
          <button>Button</button>
        </div>
      </Parallax>
    </Draggable>
  );
};

export default ContentBox;
