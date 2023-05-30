import React, { useState, useEffect } from 'react';
import { ContactProps, User } from '../../redux/types/reducerTypes';
import { updateStatus } from '../../redux/features/user';
import avatarImg from '../../../public/images/avatar.png';

const Contacts = ({
  contacts,
  changeChat,
  status,
  searchQuery,
}: ContactProps) => {
  const [selected, setSelected] = useState(NaN);
  const [filteredUsers, setFilteredUsers] = useState([] as User[]);

  const changeCurrentChat = (index: number, contact: User) => {
    setSelected(index);
    changeChat(contact);
  };

  useEffect(() => {
    for (let i = 0; i < Object.keys(status).length; i++) {
      const userId = Object.keys(status)[i];
      updateStatus({ [userId]: status[i] });
    }
  }, [status]);

  useEffect(() => {
    if (searchQuery) {
      const filteredObjects = contacts.filter((contact) =>
        contact.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filteredObjects);
    }
  }, [searchQuery, contacts]);

  return (
    <div id="conversation-list">
      {searchQuery && filteredUsers
        ? filteredUsers.map((contact, index) => (
            <div
              className={`conversation ${index === selected ? 'selected' : ''}`}
              key={contact._id}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <img src={avatarImg} alt="avatar" />
              <div className="title-text">{contact.userName}</div>
              <h3 className="status-tag">
                <span className={contact.active ? 'online' : 'offline'}></span>
                {contact.active ? 'online' : 'offline'}
              </h3>
              <div className="last-active">Sample</div>
            </div>
          ))
        : contacts.map((contact, index) => (
            <div
              className={`conversation ${index === selected ? 'selected' : ''}`}
              key={contact._id}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <img src={avatarImg} alt="avatar" />
              <div className="title-text">{contact.userName}</div>
              <h3 className="status-tag">
                <span className={contact.active ? 'online' : 'offline'}></span>
                {contact.active ? 'online' : 'offline'}
              </h3>
              <div className="last-active">Sample</div>
            </div>
          ))}
    </div>
  );
};

export default Contacts;
