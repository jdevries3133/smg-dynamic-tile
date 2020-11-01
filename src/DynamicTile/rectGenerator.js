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
  */
    this.generatePitchedTrackRects();
    // consider adding percussion notes in the future, but clipping the
    // percussion notes may be good enough for the preview.
  };

  generatePitchedTrackRects() {
    const pitchedTrack = this.song.midiParsed.track[1];
    // forEach event
    pitchedTrack.event.forEach((msg) => {
      this.currentTime += msg.deltaTime;
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
      <rect
        key={this.currentTime + Math.random().toString()}
        width={`${width}px`}
        height="8px"
        x={`${x}px`}
        y="50px"
      />
    );
  }
}
