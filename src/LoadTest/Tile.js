import React from "react";
import PropTypes from "prop-types";

export const Tile = (props) => {
  const randColor = () => {
    // generate random rgb color values
    let colors = [];
    for (let i = 0; i <= 3; i++) {
      colors.push(Math.floor(Math.random() * 255));
    }
    return "rgb(" + colors.join(",") + ")";
  };
  const rects = () => {
    // generate random rect elements
    let rects = [];
    for (let i = 0; i <= props.numRects; i++) {
      rects.push(
        <rect
          key={(Math.random() * 500).toString()}
          width="40"
          height="20"
          x={Math.floor((Math.random() * 400).toString())}
          y={Math.floor((Math.random() * 200).toString())}
          style={{
            fill: randColor(),
            strokeWidth: "3",
            stroke: "rgb(0,0,0)",
          }}
        />
      );
    }
    return rects;
  };
  return (
    <div style={{ display: "inline-block" }}>
      <svg
        width="400px"
        height="200px"
        // viewBox="0 0 2880 1160"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <image
            id="image"
            width="400px"
            height="200px"
            xlinkHref="assets/grid.png"
          />
        </defs>
        <use id="Background-Layer" xlinkHref="#image" x="0px" y="0px" />
        {rects()}
      </svg>
    </div>
  );
};

Tile.defaultProps = {
  numRects: 30,
};

Tile.propTypes = {
  numrects: PropTypes.number,
};
