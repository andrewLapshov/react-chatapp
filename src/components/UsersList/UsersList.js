import React, { useState } from 'react';
import './UsersList.css';

const UsersList = ({ users }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={`userslist ${toggle ? 'userslist_show' : ''}`}>
      <button
        className="userslist__toggler"
        onClick={() => setToggle((toggle) => !toggle)}
      />
      <div className="userslist__container">
        <h3 className="userslist__title">Пользователи</h3>
        {users.map((data, i) => (
          <span className="userslist__name" key={i}>
            {data.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
