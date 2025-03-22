import { JSX, useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "./Icons";
import "../globals.css";
import * as React from "react";

const Tree: React.FC<{
  defaultOpen?: boolean;
  name: string | JSX.Element;
  children?: React.ReactNode;
}> = ({ children, name, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);

  const Icon = Icons[
    `${children ? (isOpen ? "Minus" : "Plus") : "Close"}SquareO`
  ] as React.ElementType;

  return (
    <div className="tree-frame">
      <Icon
        className="tree-toggle"
        style={{ opacity: children ? 1 : 0.3 }}
        onClick={() => setOpen(!isOpen)}
      />
      <span className="tree-title">{name}</span>
      <motion.div
        className="tree-content"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1, y: 0 },
          closed: { height: 0, opacity: 0, y: 20 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div>{children}</div>
      </motion.div>
    </div>
  );
};

export default Tree;
