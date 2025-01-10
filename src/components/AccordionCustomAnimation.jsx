/* eslint-disable react/prop-types */
import { useState } from "react";

export const AccordionCustomAnimation = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200">
      <div
        className="cursor-pointer px-4 py-2 bg-gray-100"
        onClick={handleToggle}
      >
        {children[0]}
      </div>
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 py-2">{children[1]}</div>
      </div>
    </div>
  );
};

export const AccordionHeader = ({ children }) => {
  return <div className="text-lg font-semibold">{children}</div>;
};

export const AccordionBody = ({ children }) => {
  return <div className="text-sm text-gray-700">{children}</div>;
};
