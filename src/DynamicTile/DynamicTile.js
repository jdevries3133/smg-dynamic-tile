import React, { useEffect, useState } from "react";
import { Song } from "./MidiParser/Parser";

export const DynamicTile = (props) => {
  // put song inside useEffect to make it not block the UI thread, and assign
  // it a ref or something so that it doesn't change on every render.
  const [song, setSong] = useState(null);
  useEffect(() => {
    setSong(new Song(props.url));
  }, [props.url]);
  if (song) song.parse();
  return (
    <div>
      {song ? <h1>yes</h1> : <h1>no</h1>}
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
