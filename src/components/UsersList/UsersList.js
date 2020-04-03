import React from 'react';
import './UsersList.css';

const UsersList = ({ users }) => (
  <div className="userslist">
    <h3 className="userslist__title">Пользователи</h3>
    {users.map((data, i) => (
      <span className="userslist__name" key={i}>
        {data.name}
      </span>
    ))}
  </div>
);

export default UsersList;
