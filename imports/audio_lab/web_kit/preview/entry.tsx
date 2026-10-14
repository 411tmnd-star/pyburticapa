import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { LabShell } from "@/components/motion/MotionLab";
import { MotionPlayerProvider, useMotionPlayer } from "@/components/motion/MotionPlayerProvider";

/** Preview only: ?song=detty&profile=cinematic&t=16.2&play=1 sets up a moment to look at. */
function Seeker() {
  const q = new URLSearchParams(location.search);
  const { manifest, song, profileId, timeline, selectSong, selectProfile, seek, play } = useMotionPlayer();
  const wantSong = q.get("song"), wantProfile = q.get("profile"), t = q.get("t");
  useEffect(() => { if (manifest && wantSong && song?.id !== wantSong) selectSong(wantSong); }, [manifest, wantSong, song, selectSong]);
  useEffect(() => { if (song && wantProfile && profileId !== wantProfile && song.profiles.some((p) => p.id === wantProfile)) selectProfile(wantProfile); }, [song, wantProfile, profileId, selectProfile]);
  useEffect(() => {
    const ready = timeline && (!wantSong || song?.id === wantSong) && (!wantProfile || timeline.profile.name === wantProfile);
    if (!ready) return;
    if (t) seek(parseFloat(t));
    if (q.get("play")) void play();
  }, [timeline]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

createRoot(document.getElementById("root")!).render(
  <MotionPlayerProvider>
    <Seeker />
    <div className="mx-auto max-w-5xl px-4 py-10"><LabShell /></div>
  </MotionPlayerProvider>,
);
