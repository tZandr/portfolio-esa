# Assets

**`/posters`** — one still per project. Export them all at the same crop,
around 1600px wide. Six frames that look like one set is the difference
between a designed rack and a pile of screenshots. Referenced in
`app/content/projects.ts` as `/posters/name.jpg`.

**`/video`** — the MP4s. Referenced as `/video/name.mp4`. Before a disc is
clicked, whichever one is hovered (or centred, on touch) plays blurred and
silent behind the rack — that's a preview, not a separate file, so there's
nothing extra to export for it.

**`/music`** — one ambient track, referenced in `app/content/projects.ts` as
`site.music.src`. It plays low while browsing, and pauses the moment a disc
is actually loaded. Browsers block audible autoplay before any click, so it
starts on the visitor's first interaction with the page if the initial
attempt is refused — expect it silent for a moment on a first visit.

Filenames: lowercase, no spaces, **no å ä ö**. `skogsmiljö ljud.mp4` breaks
URLs in ways that are miserable to debug. Use `skog-ambience.mp4`.

## Encoding

The projects — 1280px is plenty. They play letterboxed, not cropped, so
nothing in the corners is lost. Aim for under 10 MB each.

    ffmpeg -i capture.mov -vf "scale=1280:-2" \
      -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p \
      -c:a aac -b:a 128k -movflags +faststart project.mp4

`-movflags +faststart` is the flag not to skip. It moves the file index to
the front so playback starts while the rest downloads. Without it the
browser waits for the whole file and a 30 MB capture feels broken.
