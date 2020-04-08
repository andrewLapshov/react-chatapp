import React, { useEffect, useRef, useState } from 'react';
import config from '../../constants/config';
import removeListeners from '../../utils/removeListeners';

const { VIDEO_CONFIG } = config;

const RemoteVideo = ({ socket, streamer }) => {
  const remoteVideo = useRef(null);
  const [load, setLoad] = useState(false);
  const [volume, setVolume] = useState(false);

  let peerConnection;

  useEffect(() => {
    socket.on('offer', (id, description) => {
      peerConnection = new RTCPeerConnection(VIDEO_CONFIG);
      peerConnection
        .setRemoteDescription(description)
        .then(() => peerConnection.createAnswer())
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit('answer', id, peerConnection.localDescription);
        });
      peerConnection.ontrack = (event) => {
        setLoad(true);
        remoteVideo.current.srcObject = event.streams[0];
      };
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('candidate', id, event.candidate);
        }
      };
    });

    socket.on('candidate', (id, candidate) => {
      peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((e) => console.error(e));
    });

    socket.on('disconnectPeer', () => {
      peerConnection.close();
    });

    return () => {
      socket.emit('disconnectPeer');
      removeListeners(socket, [
        'offer',
        'candidate',
        'answer',
        'disconnectPeer',
      ]);
    };
  }, []);

  return load ? (
    <div className="video__wrapper">
      <video
        autoPlay
        muted={volume ? '' : 'muted'}
        className="video__content"
        ref={remoteVideo}
      />
      <span className="video__name">{streamer}</span>
      <button
        className={`video__volume ${volume ? '' : 'video__volume_off'}`}
        type="button"
        title={volume ? 'Выключить звук' : 'Включить звук'}
        onClick={() => setVolume((volume) => !volume)}
      />
    </div>
  ) : (
    <span className="video__loader">Загрузка...</span>
  );
};

export default RemoteVideo;
