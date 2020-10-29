import React from "react";

const NUMBER_OF_RECTANGLES = 50;

export const LoadTestTile = (props) => {
  const rects = () => {
    const randColor = () => {
      let colors = [];
      for (let i = 0; i <= 3; i++) {
        colors.push(Math.floor(Math.random() * 255));
      }
      return "rgb(" + colors.join(",") + ")";
    };
    let rects = [];
    for (let i = 0; i <= NUMBER_OF_RECTANGLES; i++) {
      rects.push(
        <rect
          width="40"
          height="20"
          x={(Math.random() * 400).toString()}
          y={(Math.random() * 200).toString()}
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
    <div style={{ width: "100%", height: "100%" }}>
      <svg
        width="2880px"
        height="1160px"
        viewBox="0 0 2880 1160"
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
        {props.children}
        <use
          id="Background-Layer"
          xlinkHref="#image"
          x="0px"
          y="0px"
          width="2880px"
          height="1160px"
        />
        {rects()}
      </svg>
    </div>
  );
};
