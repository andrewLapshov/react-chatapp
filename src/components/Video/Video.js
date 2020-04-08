import React, { useState } from 'react';
import LocalVideo from '../LocalVideo/LocalVideo';
import RemoteVideo from '../RemoteVideo/RemoteVideo';
import './Video.css';

const Video = ({ socket, stream, name, setStreamButton, streamer }) => {
  const [toggler, setToggler] = useState(false);

  return (
    <div className="video">
      <button
        className="video__toggler-wrapper"
        type="button"
        onClick={() => setToggler((toggler) => !toggler)}
      >
        {toggler ? (
          <span className="video__toggler-caption">Показать</span>
        ) : null}
        <div
          className={`video__toggler ${
            toggler ? 'video__toggler_show' : 'video__toggler_hide'
          }`}
          title={toggler ? 'Показать трансляцию' : 'Свернуть трансляцию'}
        />
      </button>

      <div
        className={`video__container ${toggler ? 'video__container_hide' : ''}`}
      >
        {stream === 'local' ? (
          <LocalVideo
            socket={socket}
            name={name}
            setStreamButton={setStreamButton}
          />
        ) : (
          <RemoteVideo socket={socket} streamer={streamer} />
        )}
      </div>
    </div>
  );
};

export default Video;
