import React, { useEffect, useRef, useState } from 'react';
import config from '../../constants/config';
import removeListeners from '../../utils/removeListeners';

const { VIDEO_CONFIG } = config;

const LocalVideo = ({ socket, name, setStreamButton }) => {
  const localVideo = useRef(null);
  const [load, setLoad] = useState(false);
  const [mic, setMic] = useState(true);

  const peerConnections = {};
  const constraints = {
    video: { facingMode: 'user' },
    audio: true,
  };

  const micHandler = () => {
    localVideo.current.srcObject.getAudioTracks()[0].enabled = !mic;
    setMic((mic) => !mic);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setLoad(true);
        localVideo.current.srcObject = stream;
        socket.emit('broadcaster');
        localVideo.current.play();
        setStreamButton(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  useEffect(() => {
    socket.on('watcher', (id) => {
      const peerConnection = new RTCPeerConnection(VIDEO_CONFIG);
      peerConnections[id] = peerConnection;

      const stream = localVideo.current.srcObject;
      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('candidate', id, event.candidate);
        }
      };

      peerConnection
        .createOffer()
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit('offer', id, peerConnection.localDescription);
        });
    });

    socket.on('answer', (id, description) => {
      peerConnections[id].setRemoteDescription(description);
    });

    socket.on('candidate', (id, candidate) => {
      peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on('disconnectPeer', (id) => {
      peerConnections[id].close();
      delete peerConnections[id];
      console.log('peer disconnected');
    });

    const closeStream = () => {
      localVideo.current.srcObject.getTracks().forEach((track) => track.stop());
      socket.emit('broadcastOff');

      removeListeners(socket, [
        'watcher',
        'candidate',
        'answer',
        'disconnectPeer',
      ]);
    };

    window.onbeforeunload = () => {
      closeStream();
    };

    window.onunload = () => {
      closeStream();
    };

    return () => {
      closeStream();
    };
  }, []);

  return load ? (
    <div className="video__wrapper">
      <video muted className="video__container" ref={localVideo} />
      <span className="video__name">{name}</span>
      <button
        className={`video__volume video__volume_mic ${
          mic ? '' : 'video__volume_mic_off'
        }`}
        type="button"
        title={mic ? 'Выключить микрофон' : 'Включить микрофон'}
        onClick={micHandler}
      />
    </div>
  ) : (
    <span className="video__loader">Получаем доступ к камере...</span>
  );
};

export default LocalVideo;
