"use client";

import * as React from "react";
import { useState } from "react";
import Draggable from "./components/Draggable";
// import Tree from "./components/Tree";
import { Parallax } from "react-scroll-parallax";
import "./globals.css";

export default function Page() {
  const [isBlue, setIsBlue] = useState(false);

  const toggleColor = () => {
    setIsBlue(!isBlue);
  };

  return (
    <>
      <div className="toggle-blob">
        <label className="switch">
          <input
            type="checkbox"
            className="blob-check"
            onChange={toggleColor}
          />
          <span className="slider"></span>
        </label>
        <p>the blob</p>
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
      {["box-1", "box-2", "box-3", "box-4", "box-5"].map((box, index) => (
        <Parallax key={index} speed={10} className="parallax-box">
          <Draggable>
            <div className={`content-box ${box}`}>
              <h2>Subtitle</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus libero molestiae hic nobis ipsum culpa eveniet dolores
                vitae, ab repellendus voluptatem vero at labore eligendi
                mollitia quaerat in delectus! Quis.
              </p>
              <button>Button</button>
            </div>
          </Draggable>
        </Parallax>
      ))}
    </>
  );
}
