import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

// Login page

const Join = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    if (location.state) setRoom(location.state.room);
  }, [location.state, room]);

  return (
    <div className="join">
      <div className="join__wrapper">
        <h1 className="join__title">
          {location.state
            ? 'Введите имя, чтобы войти в чат'
            : 'Введите имя и комнату, чтобы войти в чат'}
        </h1>
        <form className="join__form">
          <input
            className="join__input"
            name="name"
            placeholder="Введите имя"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          {location.state ? null : (
            <input
              className="join__input"
              name="room"
              placeholder="Введите комнату"
              type="text"
              onChange={(e) => setRoom(e.target.value)}
            />
          )}
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className="join__button" name="enter">
              Войти
            </button>
          </Link>
        </form>
      </div>
      <p className="join__author">2020, Andrew Lapshov</p>
    </div>
  );
};

export default Join;
