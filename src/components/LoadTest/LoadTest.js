import React from "react";
import PropTypes from "prop-types";
import { Tile } from "./Tile";

export const LoadTest = (props) => {
  let tiles = [];
  for (let i = 0; i <= props.numTiles; i++) {
    tiles.push(<Tile numRects={props.numRects} key={i} />);
  }
  return <div>{tiles}</div>;
};

LoadTest.defaultProps = {
  numRects: 30,
  numTiles: 200,
};

LoadTest.propTypes = {
  numRects: PropTypes.number,
  numTiles: PropTypes.number,
};
