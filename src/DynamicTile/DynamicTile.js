import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Song } from "./MidiParser/Parser";
import { generateRects } from "./rectGenerator";

export const DynamicTile = (props) => {
  const [song, setSong] = useState(null); // becomes parsed Song object instance
  useEffect(() => {
    // fetch and parse Song object
    const songObj = new Song(props.url);
    songObj.parse().then(() => {
      setSong(songObj);
    });
  }, [props.url]);

  // generate rects once midi has been parsed
  let rectsFromGenerator;
  if (song && song.isParsed) {
    const gridContext = {
      pixelWidth: props.totalWidthPixels,
      pixelHeight: props.totalHeightPixels,
    };
    rectsFromGenerator = generateRects(song, gridContext);
  }

  // break width and height integer props into strings in object for jsx
  const tileSize = {
    width: props.totalWidthPixels.toString() + "px",
    height: props.totalHeightPixels.toString() + "px",
  };
  return (
    <div>
      <svg {...tileSize}>
        <defs>
          <image id="baseImage" xlinkHref="baseGrid.jpg" {...tileSize} />
        </defs>
        <use id="baseImage" xlinkHref="#baseImage" x="0px" y="0px" />
        {rectsFromGenerator}
      </svg>
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
  totalWidthPixels: PropTypes.number,
  totalHeightPixels: PropTypes.number,
};

DynamicTile.defaultProps = {
  totalWidthPixels: 250,
  totalHeightPixels: 96,
};
