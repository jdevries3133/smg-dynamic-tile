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

  const [inp, setInp] = useState("200");
  const [url, setUrl] = useState(DEFAULT_URL);
  const songId = url.slice(-16);
  const urlIsValid = SMG_URL_REGEX.test(url);
  if (urlIsValid && !urls.includes(url)) {
    return (
      <div style={{ paddingLeft: "10px", paddingTop: "10px" }}>
        <h1>Whoops!</h1>
        <p>
          Woah there partner, it looks like you tried to use a url that is not
          one of these four urls that I chucked into the mock api in this repo.
          Come back when I figure out how to build a backend for this stupid
          square.
        </p>
        <ul>
          {urls.map((u) => (
            <li>{u}</li>
          ))}
        </ul>
      </div>
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
      <p>
        Want to see your own song tileified? Go{" "}
        <a href="https://musiclab.chromeexperiments.com/Song-Maker/">here</a>;
        then, paste your link below!
      </p>
      <input
        style={{ width: "500px" }}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <br />
      {urlIsValid ? (
        <DynamicTile totalWidthPixels={parseInt(inp)} songId={songId} />
      ) : (
        <h2>I can't render that url ya dingus</h2>
      )}
    </div>
  );
};
