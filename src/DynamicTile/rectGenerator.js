import React from "react";

const pushRect = (arr, startTime, stopTime, context) => {
  // push the rect on the rect array
  // todo: calculate below values for rect given args
  const x = "??";
  const y = "??";
  const height = "??";
  const width = "??";
  const color = "??";
};

export const generateRects = (song, gridContext) => {
  /*
  generate rect elements to paint song onto the base grid
  gridContext describes the total pixel width and height of the grid, used
  to calculate the position of the rectangles.
  */
  /* PLANNING
   *
   * 1. init array of rects
   * 2. iterate through midi data
   *      presume that track 1 = pitched, track 2 = percussion always
   * 3. generate rects on the fly and push them onto the array
   *
   * Notes
   *
   * Use math with the gridContext to calculate the x / y position
   * of the rects based on where we are in the track when the rect
   * is encountered, and the pitch of the note that is happening
   *
   * In the song maker, color is statically mapped to pitch. Create
   * an object such that the pitch number can fetch the color. Consider
   * using modulo calculation such that any pitch number can fetch the
   * correct color.
   */
  console.log(song);
  console.log(gridContext);
  const [pitched, percussion] = song.midiParsed.track.slice(1, 3);
  // init variables controlled by loop over track events
  let rects = [];
  let currentTime = 0;
  let noteStart = 0;
  // deal with pitched track
  pitched.event.forEach((msg) => {
    currentTime += msg.deltaTime;
    switch (msg.type) {
      case 12:
        // program change; comes at start of each track
        break;
      case 8:
        // note off
        pushRect(rects, noteStart, currentTime, gridContext);
        break;
      case 9:
        // note on
        noteStart = currentTime;
        break;
      case 255:
        // meta
        switch (msg.metaType) {
          case 47:
            // end of track
            break;
          case 81:
            // SMTPE Offset (starting point offset from start of track
            break;
          default:
            throw new Error(`Unexpected meta event type ${msg.metaType}`);
        }
        break;
      default:
        throw new Error(`Unexpected event type ${msg.metaType}`);
    }
  });
};
