import React, { useState } from "react";
import { DynamicTile } from "./DynamicTile";

import { SMG_URL_REGEX } from "./DynamicTile/constants";

export const DevStage = (props) => {
  const urls = [
    // a song in 4/4 time 4 measures long
    "https://musiclab.chromeexperiments.com/Song-Maker/song/6701431171055616",
    // same as url1, but faster
    "https://musiclab.chromeexperiments.com/Song-Maker/song/5769053162438656",
    // a song in 9/8 time 3 bars long
    "https://musiclab.chromeexperiments.com/Song-Maker/song/6436082789908480",
    // a song in 4/4 time 3 bars long
    "https://musiclab.chromeexperiments.com/Song-Maker/song/4669822318149632",
  ];

  const DEFAULT_URL = urls[0];

  const [inp, setInp] = useState("500");
  const [url, setUrl] = useState(DEFAULT_URL);
  const songId = url.slice(-16);
  const urlIsValid = SMG_URL_REGEX.test(url);
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
          console.log(e.target.value);
          setUrl(e.target.value);
        }}
      >
        {urls.map((u, i) => (
          <option key={i} value={u}>
            Song {i + 1}
          </option>
        ))}
      </select>
      <br />
      <DynamicTile totalWidthPixels={parseInt(inp)} songId={songId} />
    </div>
  );
};
