import React from "react";

import { PITCH_COLORS } from "./constants";

export class RectGenerator {
  /*
   * Generate rects to paint on the base SVG image
   *
   * THIS CLASS MAY GENERATE ERRORS if it encounters an unhandled midi event
   * type after calling the parse() method.
   *
   * There are many, many midi event types. I don't know if, in some
   * circumstances, the Music Lab Song Maker uses some event type that
   * actually matters for rendering the rects. Therefore, this class does
   * not fail silently!
   */
  constructor(song, gridContext) {
    this.song = song;
    this.gridContext = gridContext;
    this.rects = [];
    this.currentTime = 0;
  }
  generateRects = (song, gridContext) => {
    this.generatePitchedTrackRects();
    /*
     * Currently ignore percussion notes because it's good enough for a
     * thumbnail. If you add the percussion track, there is a thing in .
     * constants.js to expose the percussion track by changing the svg aspect
     * ratio.
     */
  };

  generatePitchedTrackRects() {
    const pitchedTrack = this.song.midiParsed.track[1];
    // forEach event
    pitchedTrack.event.forEach((msg) => {
      this.currentTime += msg.deltaTime;
      switch (msg.type) {
        /*
         * It's important to note that in the MusicLab Song Maker, all notes
         * are the same length: 1 subdivision, whatever that is. Therefore,
         * we can ignore all midi events except for type 9: "Note On."
         *
         * However, I am keeping the switch like this because I want to
         * throw exceptions for midi events I haven't handled. An exception
         * caused by an unexpected midi event type could be a cookie crumb
         * leading to a bug; I don't want it to happen silently.
         */
        case 12:
          // program change; comes at start of each track
          break;
        case 8:
          // note off
          break;
        case 9:
          // note on
          this.noteNumber = msg.data[0];
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
  calcRectY() {
    // calculate y position of the rectangle
    console.log(this);
    return "50px";
  }
  calcColor() {
    return PITCH_COLORS[this.noteNumber % 12];
  }

  pushRect() {
    const x = this.calcRectX();
    const y = this.calcRectY();
    const height = "??";
    const PIXEL_WIDTH_TO_TILE_WIDTH_RATIO = 0.032;
    const width = this.gridContext.pixelWidth * PIXEL_WIDTH_TO_TILE_WIDTH_RATIO;
    const color = this.calcColor();
    this.rects.push(
      <rect
        key={this.currentTime + Math.random().toString()}
        width={`${width}px`}
        height="8px"
        x={`${x}px`}
        y={y}
        style={{ fill: color }}
      />
    );
  }
}
