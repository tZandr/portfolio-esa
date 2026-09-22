# ESA

Portfolio homepage for a game audio designer. Full-height hero: the showreel
loops behind everything, the rack of discs sits along the bottom, and the
slot is cut into the last strip of the viewport. Pick a disc and it drops
into the deck while the footage above changes to that project.

Screen on top, slot underneath — a car head unit. That's why it needs no
explaining.

```bash
npm run dev     # http://localhost:3000
npm run build
```

## The only file you need

**`app/content/projects.ts`**. Titles, descriptions, poster images, video
files, the nav links, the statement — all of it. Adding a project is copying
one block. Nothing else needs touching to change what the site says.

Put media in `public/posters/` and `public/video/` (see `public/README.md`
for encoding — compression is on us now, there's no streaming service
adapting anything).

A project with `video: ""` shows its poster full screen and plays nothing.
That's the launch state: it works with stills alone, and video drops in
later one line at a time.

## Layout

```
app/
  content/projects.ts      ← edit this
  components/Hero.tsx      ← the disc mechanics. Rarely needs touching.
  components/Hero.module.css
  layout.tsx               fonts + page title
  page.tsx                 renders Hero with the project list
public/
  posters/  video/
```

## Decisions worth knowing before changing them

**The first impression is silent.** Browsers block autoplay with sound, so
the loop greeting visitors to a *sound designer's* site makes no noise. The
loop has no audio track at all — pointless weight. Clicking a disc is a user
gesture, so those play with sound.

**Project video is `object-fit: contain`, not `cover`.** The point of an
implementation clip is the Wwise window and the profiler in the corners of
the frame. Cropping to fill the viewport removes the evidence.

**The drop is pure vertical translation.** No scale, no rotation, no fade.
Depth is layer order: the deck's apron covers whatever passes the seam.
Rotating it read as the disc warping, which is worse than no effect.

**Eject finishes before the hero closes.** Closing first moves the rack
mid-flight and the disc misses the socket it came from.

**Height is `100svh`.** On iOS, `100vh` measures against browser chrome that
then slides away, cropping the bottom of the hero — exactly where the slot
lives.

**Fonts are self-hosted** via `next/font`, fetched at build time. Nothing
goes to Google at runtime, which keeps visitor IPs out of Google's hands —
the GDPR question a plain Google Fonts `<link>` raises for an EU site. The
build does need network access to fetch them once; in a restricted CI, swap
to `next/font/local` with the .woff2 files committed.

## Handing it over

The point of this structure is that "add this video to the homepage" is one
block in one file. Prompts that work cleanly:

- *"Add a new project called X, with the video video/x.mp4 and poster posters/x.jpg"*
- *"Change the description under ESA to ..."*
- *"Move Creature foley to be the second disc"*
- *"Update my email in the top bar to ..."*

Each is a change to `app/content/projects.ts` and nothing else.
