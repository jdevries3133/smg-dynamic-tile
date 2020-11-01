import React from "react";
import { DynamicTile } from "./DynamicTile";

// a song in 4/4 time 4 measures long
const url1 =
  "https://musiclab.chromeexperiments.com/Song-Maker/song/6701431171055616";

// same as url1, but faster
const url2 =
  "https://musiclab.chromeexperiments.com/Song-Maker/song/5769053162438656";

// a song in 9/8 time 3 bars long
const url3 =
  "https://musiclab.chromeexperiments.com/Song-Maker/song/6436082789908480";

// a song in 4/4 time 3 bars long
const url4 =
  "https://musiclab.chromeexperiments.com/Song-Maker/song/4669822318149632";

export const DevStage = (props) => {
  return <DynamicTile url={url4} />;
};
