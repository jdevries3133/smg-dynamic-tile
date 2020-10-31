import React from "react";
import { DynamicTile } from "./DynamicTile";

// This is just a staging area while I work on the component.
const url1 =
  "https://musiclab.chromeexperiments.com/Song-Maker/song/6701431171055616";

// same as url1, but faster
const url2 =
  "https://musiclab.chromeexperiments.com/Song-Maker/song/5769053162438656";

// a song in 9/8 time 3 bars long
const url3 =
  "https://musiclab.chromeexperiments.com/Song-Maker/song/6436082789908480";

export const DevStage = (props) => {
  return <DynamicTile url={url3} />;
};
