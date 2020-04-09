/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef } from 'react';
import './SendForm.css';

const SendForm = ({
  message,
  sendMessage,
  setMessage,
  toggleStream,
  streamButton,
  stream,
}) => {
  const textInput = useRef(null);
  const [isVideo, setIsVideo] = useState(false);

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
      {stream !== 'remote' ? (
        <button
          className={`sendform__video ${isVideo ? 'sendform__video_off' : ''}`}
          title="Начать/закончить видео трансляцию"
          type="button"
          onClick={() => {
            toggleStream();
            setIsVideo((isVideo) => !isVideo);
          }}
          disabled={streamButton ? '' : 'disabled'}
        />
      ) : null}
      <button
        className="sendform__button"
        type="submit"
        onClick={(e) => sendMessage(e)}
      >
        <span className="sendform__text">Отправить</span>
      </button>
    </form>
  );
};

export default SendForm;
