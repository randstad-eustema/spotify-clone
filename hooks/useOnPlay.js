import usePlayer from "./usePlayer";

export default function useOnPlay() {
  const player = usePlayer();

  function onPlay(id) {
    player.setId(id);
  }

  return onPlay;
}
