import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Song } from "./MidiParser/Parser";
import { RectGenerator } from "./rectGenerator";
import { validateWidthHeight } from "./customPropTypes";
import { ASPECT_RATIO } from "./constants";

export const DynamicTile = (props) => {
  /*
   * DynamicTile component takes only one required prop: "songId".
   * This prop should be the sixteen digit ID associated with a song
   * from the Music Lab Song Maker, and it's type should be a string. Height
   * or width (integers) are optional props which will cause the component
   * to render at that dimension in pixels. Height and width are mutually
   * exclusive; the component renders at a fixed aspect ratio so do not
   * pass them together.
   *
   * Due to google's CORS policy, this component cannot work in isolation.
   * It is impossible to request the MIDI file and JSON data from Google
   * directly from the client browser. Instead, it is necessary for a
   * backend to exist where you have cached the MIDI and JSON data from
   * the song maker. Endpoints where this component searches for that
   * information are listed in src/constants.js.
   */

  // State variables become parsed Song object instance. Using useState because
  // we need to trigger a re-render once the song is fetched and parsed.
  const [song, setSong] = useState(null);
  useEffect(() => {
    // fetch and parse Song object
    const songObj = new Song(props.songId);
    songObj.parse().then(() => {
      setSong(songObj);
    });
  }, [props.songId]);
  // generate rects once midi has been parsed
  let rectGenerator;
  if (song && song.isParsed) {
    const gridContext = {
      pixelWidth: props.totalWidthPixels,
      pixelHeight: props.totalHeightPixels,
    };
    rectGenerator = new RectGenerator(song, gridContext);
    try {
      // will throw error if unexpected midi event type occurs
      rectGenerator.generateRects();
    } catch (e) {
      // TODO: logging entrypoint for unexpected midi event types
      console.log(e);
    }
  }
  const calcTileSize = ({ totalWidthPixels, totalHeightPixels }) => {
    // 1. break width and height into jsx-friendly object.
    // 2. Calculate width if height is given; calculate height if width is
    //    given.
    if (totalWidthPixels) {
      // this will always be the case for now
      totalHeightPixels = totalWidthPixels / ASPECT_RATIO;
    } else if (totalHeightPixels) {
      // todo acccept height as a prop instead of width and calculate the width
      // instead.
      totalWidthPixels = totalHeightPixels * ASPECT_RATIO;
    }
    return {
      width: totalWidthPixels + "px",
      height: totalHeightPixels + "px",
    };
  };
  const tileSize = calcTileSize(props);
  return (
    <div
      style={{
        display: "inline-block",
        width: tileSize.width,
        height: tileSize.height,
      }}
    >
      <svg
        // Prettier formats this very stupidly
        // I'm just chopping "px" off the end of the width and height strings
        viewBox={`0 0 ${tileSize.width.slice(0, -2)} ${tileSize.height.slice(
          0,
          -2
        )}`}
        xmlns="https://www.w3.org/2000/svg"
      >
        <defs>
          <image
            id="baseImage"
            xlinkHref="baseGrid.jpg"
            width={tileSize.width}
            x="0px"
            y="0px"
          />
        </defs>
        <use id="baseImage" xlinkHref="#baseImage" />
        {rectGenerator ? rectGenerator.rects : null}
      </svg>
    </div>
  );
};

DynamicTile.propTypes = {
  songId: PropTypes.string.isRequired,
  totalWidthPixels: validateWidthHeight,
  totalHeightPixels: validateWidthHeight,
};

DynamicTile.defaultProps = {
  totalWidthPixels: 600,
};
