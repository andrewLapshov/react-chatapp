import React from 'react';
import './Message.css';

const Message = ({ data, user }) => {
  const { name, msg, time } = data;
  let isUserCurrent = false;

  if (name === user) isUserCurrent = true;

  return isUserCurrent ? (
    <div className="message__wrapper message__wrapper_current-user">
      <p className="message message_current-user">{msg}</p>
      <span className="message__username">{`${name}, ${time}`}</span>
    </div>
  ) : (
    <div className="message__wrapper">
      <p className="message">{msg}</p>
      <span className="message__username">{`${name}, ${time}`}</span>
    </div>
  );
};

export default Message;
