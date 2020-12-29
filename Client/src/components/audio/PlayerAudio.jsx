import React, { useState, useEffect } from 'react';

const useAudio = props => {
  const { url, isAutoPlay = false } = props;
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(isAutoPlay);

  const toggle = (value) => setPlaying(value);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};

const PlayerAudio = ({ url }) => {
  const [playing, toggle] = useAudio({ url: url });

  return (
    <div>
      <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
    </div>
  );
};
export { useAudio };
export default PlayerAudio;
