import MidiParser from "midi-parser-js";
import { getSongData } from "./network";

export class Song {
  constructor(url) {
    this.url = url;
  }
  parse() {
    getSongData(this.url).then((data) => {
      this.songData = data;
      this.parseFetchedData();
    });
  }
  parseFetchedData() {
    this.midiParsed = MidiParser.parse(this.songData.midiBytes);
  }
}
