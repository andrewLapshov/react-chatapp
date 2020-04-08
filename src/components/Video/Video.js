import React from 'react';
import LocalVideo from '../LocalVideo/LocalVideo';
import RemoteVideo from '../RemoteVideo/RemoteVideo';
import './Video.css';

const Video = ({ socket, stream, name, setStreamButton, streamer }) => {
  return (
    <div className="video">
      {stream === 'local' ? (
        <LocalVideo
          className="video__container"
          socket={socket}
          name={name}
          setStreamButton={setStreamButton}
        />
      ) : (
        <RemoteVideo
          className="video__container"
          socket={socket}
          streamer={streamer}
        />
      )}
    </div>
  );
};

export default Video;
