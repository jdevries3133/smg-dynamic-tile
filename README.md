# Dynamically Rendering Song Maker Gallery Tile

I need a react component that can take this:

- https://musiclab.chromeexperiments.com/Song-Maker/song/6671901928718336

... and give me this:

<img src="https://i.imgur.com/D2ovjwy.png" />

## Too much to ask for?

Let's find out.

> Implemented in React with the help of midi-parser-js.

# A caveat

*I have encountered a dilemma.*

It will not be possible to request the midi file or json objects from the
music lab on the client side due to Google's CORS policy. Instead, it will
be necessary to have my own backend that caches the midi and json data from
the songmaker when the songs are uploaded by the user.

However, because the data is so small, it will probably be more doable than
dealing with screenshots was. I envison some optimizations, too:

- Fetch the data from google lazily with AWS Fargate Spot

- If a user requests a song that is not yet cached, just fetch it on the fly
    and cache it then.

    - Actually, now that I think of that, maybe I should just do that for
        everything.... After all, the user is probably going to preview
        their new gallery immediately thereby fetching everything... I can just
        wait until the first gallery request to do all the fetching anyway.

- Maybe in the end, I can continue to offer immediately available galleries as
    a premium service; the difference, though, is that with this system
    I should always be able to turn around free galleries in a few hours no
    matter what. The fargate cluster will just need time to make the cache.

