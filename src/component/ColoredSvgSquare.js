import PropTypes from "prop-types";
import React from "react";

export const ColoredSvgSquare = (props) => {
  return (
    <rect
      width={props.width}
      height={props.height}
      style={"fill:" + props.color}
    ></rect>
  );
};

ColoredSvgSquare.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};
