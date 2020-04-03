import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Messages from '../Messages/Messages';
import UsersList from '../UsersList/UsersList';
import SendForm from '../SendForm/SendForm';
import config from '../../constants/config';
import './Chat.css';

// Main chat page
const { SERVER } = config;

let socket;

const Chat = ({ location, history }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const getTime = () =>
    `${new Date().getHours()}:${
      new Date().getMinutes() < 10 ? '0' : ''
    }${new Date().getMinutes()}`;

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', { message, time: getTime() }, () =>
        setMessage('')
      );
    }
  };

  // Initialize connection to socket.io

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(SERVER);

    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if (window.confirm(error)) {
        history.push({
          pathname: '/',
          state: {
            room,
          },
        });
      } else {
        history.push({
          pathname: '/',
        });
      }
    });

    return () => {
      socket.emit('disconnect');
      socket.disconnect();
    };
  }, [location.search, history]);

  // Message handlers

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
    socket.on('sendUsers', (users) => {
      setUsersList(users);
    });
  }, []);

  return (
    <div className="chat">
      <div className="chat__wrapper">
        <div className="chat__workspace">
          <Messages className="messages" messages={messages} user={name} />
          <UsersList users={usersList} />
        </div>
        <SendForm
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
};
export default Chat;
