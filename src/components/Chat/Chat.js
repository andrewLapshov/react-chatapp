import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Messages from '../Messages/Messages';
import UsersList from '../UsersList/UsersList';
import SendForm from '../SendForm/SendForm';
import Video from '../Video/Video';
import config from '../../constants/config';

import getTime from '../../utils/getTime';
import './Chat.css';

// Main chat page
const { SERVER } = config;

let socket;

const Chat = ({ location, history }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [stream, setStream] = useState('');
  const [streamButton, setStreamButton] = useState(true);
  const [streamer, setStreamer] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', { message, time: getTime() }, () =>
        setMessage('')
      );
    }
  };

  const toggleStream = () => {
    if (stream) {
      setStream('');
    } else {
      setStream('local');
      setStreamButton(false);
    }
  };

  // Initialize connection to socket.io

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(SERVER);

    setName(name);

    socket.emit('join', { name, room }, (error) => {
      history.push({
        pathname: '/',
        state: {
          room,
          error,
        },
      });
    });

    return () => {
      socket.emit('disconnect');
      socket.disconnect();
    };
  }, [location.search, history]);

  // Message handlers

  useEffect(() => {
    socket.on('broadcaster', (streamerName, id) => {
      socket.emit('watcher', id);
      setStream('remote');
      setStreamer(streamerName);
    });

    socket.on('broadcastOff', () => {
      setStream('');
    });

    socket.on('newMessage', (msg) => {
      setMessages((messages) => [...messages, msg]);
    });

    socket.on('sendUsers', (users) => {
      setUsersList(users);
    });

    window.onbeforeunload = () => {
      socket.close();
    };

    window.onunload = () => {
      socket.close();
    };
  }, []);

  return (
    <div className="chat">
      <div className="chat__wrapper">
        {stream ? (
          <Video
            socket={socket}
            stream={stream}
            streamer={streamer}
            name={name}
            setStreamButton={setStreamButton}
          />
        ) : null}
        <div className="chat__workspace">
          <Messages className="messages" messages={messages} user={name} />
          <UsersList users={usersList} />
        </div>
        <SendForm
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
          toggleStream={toggleStream}
          streamButton={streamButton}
          setStreamButton={setStreamButton}
          stream={stream}
        />
      </div>
    </div>
  );
};
export default Chat;
