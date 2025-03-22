"use client";

import { useEffect, useRef, useState } from "react";
import Draggable from "./Draggable";
import Tree from "./Tree";

const Navbar: React.FC = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [fixedTop, setFixedTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return;

      const rect = navbarRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;

      if (rect.top <= 0 && !isFixed) {
        setIsFixed(true);
        setFixedTop(scrollY);
      } else if (scrollY < fixedTop) {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFixed, fixedTop]);

  return (
    <div
      ref={navbarRef}
      className="header"
      style={{
        position: isFixed ? "fixed" : "relative",
        top: 0,
        width: "100%",
        backgroundColor: "black",
        transition: "height 0.3s ease-in-out",
        height: isFixed ? "4.3rem" : "8rem",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        zIndex: 1000,
      }}
    >
      <div>
        <h3
          style={{
            position: "absolute",
            left: "20px",
            transition: "font-size 0.3s ease-in-out, top 0.3s ease-in-out",
            top: isFixed ? "-1.4rem" : "2.25rem",
            color: "white",
            fontWeight: 800,
            fontStyle: "italic",
            textShadow: "#adff2f 2px 2px",
          }}
        >
          WEBSITE TITLE
        </h3>
      </div>
      <Draggable>
        <div className="content-box menu-box">
          <div className="tree-container">
            <Tree name="Menu">
              <Tree name="Products">
                <Tree name="Category 1" />
                <Tree name="Category 2" />
                <Tree name="Category 3" />
              </Tree>
              <Tree name="Cart" />
              <Tree name="About" />
              <Tree name="Login" />
            </Tree>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default Navbar;
