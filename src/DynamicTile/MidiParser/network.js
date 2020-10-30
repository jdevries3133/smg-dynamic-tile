// In the final implementation, this file will make the network requests
// back to my server to fetch midi files and json objets, which will need
// to be cached in my database because of google's CORS policy.

// For now, the midi file and json are loaded directly.

import axios from "axios";

async function fetchMidi(songId) {
  return axios
    .get(`songmidi/${songId}`, {
      responseType: "arraybuffer",
    })
    .catch((e) => console.log(e));
}

async function fetchJson(songId) {
  return axios.get(`songjson/${songId}`).catch((e) => console.log(e));
}

export async function getSongData(url) {
  const songId = url.split("/")[5];
  const midiPromise = fetchMidi(songId);
  const jsonPromise = fetchJson(songId);
  // will need to fix later; web requests will block main thread
  let returnData = {};
  await Promise.all([midiPromise, jsonPromise]).then(([midi, json]) => {
    returnData["midiBytes"] = btoa(
      String.fromCharCode.apply(null, new Uint8Array(midi.data))
    );
    returnData["json"] = json.data;
  });
  return returnData;
}
