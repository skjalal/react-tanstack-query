import React, { type JSX } from "react";
import type { ErrorBlockProps } from "../utils/data-types";

const ErrorBlock: React.FC<ErrorBlockProps> = ({
  title,
  message,
}): JSX.Element => {
  return (
    <div className="error-block">
      <div className="error-block-icon">!</div>
      <div className="error-block-text">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorBlock;
