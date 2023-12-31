import React from "react";

export const SvgSpinner = ({color}) => {
  return (
    <svg
      className={color === "white" ? "spinner white" : "spinner" }
      width="24px"
      height="24px"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="path"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  );
};
