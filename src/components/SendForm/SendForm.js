import React, { useEffect, useRef } from 'react';
import './SendForm.css';

const SendForm = ({ message, sendMessage, setMessage }) => {
  const textInput = useRef(null);

  useEffect(() => {
    const focusInput = () => {
      if (textInput) textInput.current.focus();
    };

    window.addEventListener('keydown', focusInput);
    return () => {
      window.removeEventListener('keydown', focusInput);
    };
  }, []);

  return (
    <form className="sendform">
      <input
        ref={textInput}
        className="sendform__input"
        type="text"
        placeholder="Введите сообщение"
        value={message}
        onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="sendform__button" onClick={(e) => sendMessage(e)}>
        Отправить
      </button>
    </form>
  );
};

export default SendForm;
