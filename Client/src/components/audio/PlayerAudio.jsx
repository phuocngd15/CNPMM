import React, { useState, useEffect, useRef } from 'react';

const useAudio = props => {
  const { url, isAutoPlay = false } = props;
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(isAutoPlay);

  const toggle = value => {
    setPlaying(value);
  };

  useEffect(() => {
    if (audio) {
      playing ? audio.play() : audio.pause();
    } else {
      setAudio(new Audio(url));
    }

    return () => {
      audio && audio.pause();
      audio && setAudio(null);
    };
  }, [audio, playing, url]);

  /*   useEffect(() => {
    audio && audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio &&
        audio.removeEventListener('ended', () => {
          setPlaying(false);
        });
    };
  }, [audio]); */

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
