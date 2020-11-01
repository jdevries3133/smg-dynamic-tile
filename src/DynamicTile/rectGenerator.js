import React from "react";

export class RectGenerator {
  constructor(song, gridContext) {
    this.song = song;
    this.gridContext = gridContext;
    this.rects = [];
    this.currentTime = 0;
  }

  generateRects = (song, gridContext) => {
    /*
  generate rect elements to paint song onto the base grid
  gridContext describes the total pixel width and height of the grid, used
  to calculate the position of the rectangles.
  */
    /* PLANNING
     *
     * 1. init array of rects
     * 3. iterate through midi data
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
    this.generatePitchedTrackRects();
  };

  generatePitchedTrackRects() {
    const pitchedTrack = this.song.midiParsed.track[1];
    pitchedTrack.event.forEach((msg) => {
      this.currentTime += msg.deltaTime;
      // bundle information to be referenced throughout the generation pipeline
      switch (msg.type) {
        case 12:
          // program change; comes at start of each track
          break;
        case 8:
          // note off
          break;
        case 9:
          // note on
          this.pushRect();
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
  }

  calcSquareWidth(Context) {}

  calcRectX() {
    // calculate x position of the rectangle
    return (
      (this.currentTime / this.song.midiParsed.timeDivision) *
      (this.gridContext.pixelWidth / (this.song.bars * this.song.beats))
    );
  }

  pushRect() {
    const x = this.calcRectX();
    const y = "??";
    const height = "??";
    const PIXEL_WIDTH_TO_TILE_WIDTH_RATIO = 0.032;
    const width = this.gridContext.pixelWidth * PIXEL_WIDTH_TO_TILE_WIDTH_RATIO;
    const color = "??";
    this.rects.push(
      <rect width={`${width}px`} height="8px" x={`${x}px`} y="50px" />
    );
  }
}
