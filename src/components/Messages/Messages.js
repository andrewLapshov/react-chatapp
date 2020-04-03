import React, { useEffect, useRef } from 'react';
import Message from '../Message/Message';
import './Messages.css';

const Messages = ({ messages, user }) => {
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current.scrollIntoView();
  });

  return (
    <div className="messages">
      {messages.map((data, i) => (
        <Message data={data} user={user} key={i} />
      ))}
      <div ref={messagesEnd} />
    </div>
  );
};

export default Messages;
