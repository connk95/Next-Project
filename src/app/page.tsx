"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Parallax } from "react-scroll-parallax";
import "./globals.css";
import ContentBox, { ContentBoxType } from "./components/ContentBox";

export default function Page() {
  const [blurry, setBlurry] = useState(true);
  const [content, setContent] = useState<ContentBoxType[]>([]);
  const [zIndexStack, setZIndexStack] = useState<string[]>([]);
  const [pageHeight, setPageHeight] = useState<number>();

  const bringToFront = (boxid: string) => {
    setZIndexStack((prevStack) => {
      return [...prevStack.filter((id) => id !== boxid), boxid];
    });
  };

  const randomizeLocations = (elements: ContentBoxType[]) => {
    elements.forEach((element, index) => {
      const previous = elements[index - 1];
      const pageWidth = screen.width / 16;
      const setX = (x: number) => {
        return x + Math.random() * (x + 10 - (x - 10)) + 15;
      };
      const setY = (y: number) => {
        return Math.random() * 20 + (y - 10);
      };

      if (index === 0) {
        element.location = {
          left: Math.random() * (10 - 5) + 5,
          top: Math.random() * (10 - 5) + 5,
        };
      } else if (previous?.location) {
        element.location = { left: 0, top: 0 };

        if (previous.location?.left > pageWidth - 48) {
          element.location.top =
            setY(previous.location?.top) + (Math.random() * (10 - 5) + 20);
          element.location.left = Math.random() * (10 - 0) + 5;
        } else {
          element.location.left = setX(previous.location.left);
          element.location.top = setY(previous.location.top);
          if (element.location.top < 10) {
            element.location.top += 10;
          }
        }
      }
      if (index == elements.length - 1 && element.location) {
        setPageHeight(element.location.top + 20);
      }
    });
    setContent([...elements]);
  };

  const toggleBlur = () => {
    const contentBoxes = document.querySelectorAll<HTMLElement>(".content-box");
    if (blurry === true) {
      setBlurry(false);
      contentBoxes.forEach((box) => {
        box.style.filter = "blur(0px)";
      });
    } else if (blurry === false) {
      setBlurry(true);
      contentBoxes.forEach((box) => {
        box.style.filter = "blur(2px)";
      });
    }
  };

  useEffect(() => {
    const initialContent = [
      {
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus libero molestiae hic nobis ipsum culpa eveniet dolores vitae, ab repellendus voluptatem vero at labore eligendi mollitia quaerat in delectus! Quis.",
        boxid: "1",
        location: undefined,
      },
      {
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus libero molestiae hic nobis ipsum culpa eveniet dolores vitae, ab repellendus voluptatem vero at labore eligendi mollitia quaerat in delectus! Quis.",
        boxid: "2",
        location: undefined,
      },
      {
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus libero molestiae hic nobis ipsum culpa eveniet dolores vitae, ab repellendus voluptatem vero at labore eligendi mollitia quaerat in delectus! Quis.",
        boxid: "3",
        location: undefined,
      },
      {
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus libero molestiae hic nobis ipsum culpa eveniet dolores vitae, ab repellendus voluptatem vero at labore eligendi mollitia quaerat in delectus! Quis.",
        boxid: "4",
        location: undefined,
      },
      {
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus libero molestiae hic nobis ipsum culpa eveniet dolores vitae, ab repellendus voluptatem vero at labore eligendi mollitia quaerat in delectus! Quis.",
        boxid: "5",
        location: undefined,
      },
      {
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus libero molestiae hic nobis ipsum culpa eveniet dolores vitae, ab repellendus voluptatem vero at labore eligendi mollitia quaerat in delectus! Quis.",
        boxid: "6",
        location: undefined,
      },
      {
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus libero molestiae hic nobis ipsum culpa eveniet dolores vitae, ab repellendus voluptatem vero at labore eligendi mollitia quaerat in delectus! Quis.",
        boxid: "7",
        location: undefined,
      },
    ];
    randomizeLocations(initialContent);
  }, []);

  return (
    <div style={{ height: `${pageHeight}rem` }}>
      <div className="toggle-blur">
        <label className="switch">
          <input type="checkbox" className="blob-check" onChange={toggleBlur} />
          <span className="slider"></span>
        </label>
        <p>toggle blur</p>
      </div>
      <Parallax speed={5} className="parallax-layer">
        <div className="hero-text">
          <p>
            HERO
            <br />
            TEXT
          </p>
        </div>
      </Parallax>

      {content.map((box, index) => (
        <ContentBox
          key={index}
          text={box.text}
          boxno={box.boxid}
          location={box.location}
          zIndex={zIndexStack.indexOf(box.boxid) + 1}
          bringToFront={() => bringToFront(box.boxid)}
        />
      ))}
    </div>
  );
}
