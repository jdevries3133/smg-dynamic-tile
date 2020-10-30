import React from "react";
import { Song } from "./MidiParser/Parser";

export const DynamicTile = (props) => {
  // put song inside useEffect to make it not block the UI thread, and assign
  // it a ref or something so that it doesn't change on every render.
  const song = new Song(props.url);
  song.parse();
  return (
    <div>
      <h1>Dynamic Tile</h1>
    </div>
  );
};
function validateUrl(props, propName, componentName) {
  if (
    !/http(s)?:\/\/musiclab.chromeexperiments.com\/Song-Maker\/song\/(\d){16}/.test(
      props["url"]
    )
  ) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. Regex validation failed.`
    );
  }
}

DynamicTile.propTypes = {
  url: validateUrl,
};
