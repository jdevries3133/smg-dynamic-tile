import React, { useState } from "react";
import { DynamicTile } from "./DynamicTile";

import { SMG_URL_REGEX } from "./DynamicTile/constants";

export const DevStage = (props) => {
  const urls = {
    "4/4, 4 measures long":
      "https://musiclab.chromeexperiments.com/Song-Maker/song/6701431171055616",
    "same as previous, but faster tempo":
      "https://musiclab.chromeexperiments.com/Song-Maker/song/5769053162438656",
    "9/8, 3 measures long":
      "https://musiclab.chromeexperiments.com/Song-Maker/song/6436082789908480",
    "4/4, 3 bars long":
      "https://musiclab.chromeexperiments.com/Song-Maker/song/4669822318149632",
    "4/4, 2 bars long":
      "https://musiclab.chromeexperiments.com/Song-Maker/song/5179528870625280",
  };

  const DEFAULT_URL = urls["4/4, 4 measures long"];
  const [inp, setInp] = useState("500");
  const [url, setUrl] = useState(DEFAULT_URL);
  const songId = url.slice(-16);
  const urlIsValid = SMG_URL_REGEX.test(url);
  const options = [];
  for (const description in urls) {
    options.push(
      <option key={description} value={urls[description]}>
        {description}
      </option>
    );
  }
  return (
    <div style={{ paddingLeft: "10px", paddingTop: "10px" }}>
      {urlIsValid ? (
        <a href={url}>Link to the song being displayed</a>
      ) : (
        <p>Nah that garbage is not valid</p>
      )}
      <h1>Enter the width of our tiley boi</h1>
      <input
        type="text"
        value={inp}
        onChange={(e) => {
          if (!isNaN(e.target.value) && e.target.value !== " ") {
            setInp(e.target.value);
          }
        }}
      />
      <p>Want to see a different song?</p>
      <select
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      >
        {options}
      </select>
      <br />
      <DynamicTile pixelHeight={parseInt(inp)} songId={songId} />
    </div>
  );
};
