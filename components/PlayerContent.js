"use client";
import useSound from "use-sound";

import { useEffect, useState } from "react";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import usePlayer from "@/hooks/usePlayer";
import MediaItem from "./MediaItem";
import Slider from "./Slider";

export default function PlayerContent({ song, songUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const player = usePlayer();

  const IconPlay = isPlaying ? BsPauseFill : BsPlayFill;
  const IconVolume = volume ? HiSpeakerWave : HiSpeakerXMark;

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  function onPlayNext() {
    if (player.ids.length === 0) return null;
    const currentIndex = player.ids.findIndex((id) => player.activeId === id);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) return player.setId(player.ids[0]);

    player.setId(nextSong);
  }

  function onPlayPrevious() {
    if (player.ids.length === 0) return null;
    const currentIndex = player.ids.findIndex((id) => player.activeId === id);
    const prevSong = player.ids[currentIndex - 1];

    if (!prevSong) return player.setId(player.ids[player.ids.length - 1]);

    player.setId(prevSong);
  }

  function toggleMute() {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  }

  function handlePlay() {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
        </div>
      </div>
      <div
        className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          "
      >
        <div
          className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
        >
          <IconPlay onClick={handlePlay} size={30} className="text-black" />
        </div>
      </div>
      <div
        className="
            hidden
            h-full
            md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6
          "
      >
        <AiFillStepBackward
          className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
          size={30}
          onClick={onPlayPrevious}
        />
        <div
          className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
        >
          <IconPlay onClick={handlePlay} size={30} className="text-black" />
        </div>
        <AiFillStepForward
          className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
          size={30}
          onClick={onPlayNext}
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <IconVolume onClick={toggleMute} size={30} />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
}
