"use client";

import { Equalizer } from "@/features/music/equalizer";
import { TrackCover } from "@/features/music/track-cover";
import { profile } from "@/lib/content";
import { useNowPlaying } from "@/features/music/use-now-playing";

export function StatusLine() {
  const track = useNowPlaying();
  const live = track && !track.empty && track.playing ? track : null;

  if (!live) {
    return (
      <div className="flex items-center gap-2.5">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        <span className="label-caps">{profile.status}</span>
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-2.5">
      <Equalizer />
      <span className="relative label-caps">now playing:</span>
      <a
        href={profile.lastfm}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex max-w-[20rem] items-center gap-1.5 font-mono text-[0.6875rem] tracking-wide text-muted transition-colors hover:text-fg"
      >
        {live.art ? <TrackCover src={live.art} /> : null}
        <span className="truncate">
          {live.artist} — {live.title}
        </span>
      </a>
    </div>
  );
}
