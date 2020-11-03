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
    if (this.song.bars > 4) {
      throw new Error(`
        Songs longer than 5 bars have a horizontal slider, which has not yet
        been handled
      `);
    }
    return (
      (this.currentTime / this.song.midiParsed.timeDivision) *
      (this.gridContext.pixelWidth / (this.song.bars * this.song.beats))
    );
  }
  calcRectY() {
    /* 
     * Start code from https://github.com/Tonejs/Midi 
     *
     * Used under the following LICENSE:
     *
     * [The MIT License](http://opensource.org/licenses/MIT)
     *
     * Copyright © 2016 Yotam Mann

     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:

     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.

     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.U
     *
     * Convert a pitch to a midi number
     */
    const pitchToMidi = (note) => {
      const regexp = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i;
      // prettier-ignore
      const noteToScaleIndex = {
        cbb: -2,  cb: -1, c: 0,  "c#": 1,  cx: 2,
        dbb: 0,   db: 1,  d: 2,  "d#": 3,  dx: 4,
        ebb: 2,   eb: 3,  e: 4,  "e#": 5,  ex: 6,
        fbb: 3,   fb: 4,  f: 5,  "f#": 6,  fx: 7,
        gbb: 5,   gb: 6,  g: 7,  "g#": 8,  gx: 9,
        abb: 7,   ab: 8,  a: 9,  "a#": 10, ax: 11,
        bbb: 9,   bb: 10, b: 11, "b#": 12, bx: 13,
      };
      note = parseInt(note);
      const split = regexp.exec(note);
      const pitch = split[1];
      const octave = split[2];
      const index = noteToScaleIndex[pitch.toLowerCase()];
      return index + (parseInt(octave, 10) + 1) * 12;
    };
    /*
     * End code from https://github.com/Tonejs/Midi. Return to code covered
     * under ./LICENSE
     */
    // calculate y position of the rectangle
    if (this.song.scale === "chromatic" && this.song.octaves > 2) {
      throw new Error(`
        Three octave chromatic scale songs have a vertical slider, which has
        not yet been handled.
      `);
    }
    /*  MAGIC NUMBER 48 / octaveIndex
     *  No matter the setting, the lowest note in the song maker is C3 or above.
     *  The midi number for C3 is 48. Therefore, octaveIndex is calculating
     *  a 1-based index for which octave the note is in.
     */
    /*
     * x-position = (
     *    octaveIndex * (
     *      scaleDegree * tileHeight
     *    )
     *  )
     *
     *  scaleDegree = (
     *    (octaveNumber % 12) - rootNoteNumber
     *  )
     */
    const octaveIndex = Math.floor((this.noteNumber - 48) / 12 + 1);
    const semitonesAboveRoot =
      (this.noteNumber % 12) - (this.song.rootNote % 12);
    // move to tools file or something?
    function evalScaleDegree(semitonesAboveRoot, scale) {
      let semitonesToScaleDegree;
      switch (scale) {
        case "major":
          semitonesToScaleDegree = {
            0: 1,
            2: 2,
            4: 3,
            5: 4,
            7: 5,
            9: 6,
            11: 7,
          };
          return semitonesToScaleDegree[semitonesAboveRoot];
        case "minor":
          semitonesToScaleDegree = {
            0: 1,
            2: 2,
            3: 3,
            5: 4,
            7: 5,
            8: 6,
            10: 7,
          };
          return semitonesToScaleDegree[semitonesAboveRoot];
        case "pentatonic":
          semitonesToScaleDegree = {
            0: 1,
            2: 2,
            4: 3,
            5: 4,
            9: 5,
          };
          return semitonesToScaleDegree[semitonesAboveRoot];
        case "chromatic":
          return semitonesAboveRoot + 1;
      }
    }
    const scaleDegree = evalScaleDegree(semitonesAboveRoot, this.song.scale);
    console.log(scaleDegree);

    // TODO:
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
