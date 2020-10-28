let midiParser = require('midi-parser-js');
let fs = require('fs')

// eslint-disable-next-line
const SMG_URL = 'https://musiclab.chromeexperiments.com/Song-Maker/song/5703199099977728'

fs.readFile('sample_data/song.mid', 'base64', function (err, data) {
  let midiArray = midiParser.parse(data);
  midiArray.track.forEach((i) => {
    i.event.forEach((i) => {
      console.log(i)
    })
  })
});

