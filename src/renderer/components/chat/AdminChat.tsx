import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { io } from 'socket.io-client';

import {
  getAdminContacts,
  clearErrors,
} from '../../redux/dispatchers/userDispatcher';

import NavBar from '../layout/NavBar';
import Loader from '../layout/Loader';
import ChatContainer from './ChatContainer';
import Contacts from './Contacts';
import ChatWallpaper from '../layout/ChatWallpaper';
import { ISocket, User, UserStatus } from '../../redux/types/reducerTypes';

const AdminChat = () => {
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const socket = useRef<ISocket | null>(null);

  const { users, error, loading } = useAppSelector((state) => state.user);
  const { user, loading: authLoading } = useAppSelector((state) => state.auth);

  const [currentChat, setCurrentChat] = useState({} as User);
  const [status, setStatus] = useState({} as UserStatus);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!(user.role === 'admin') && !(user.role === 'god')) {
        navigate('/chat');
      } else {
        dispatch(getAdminContacts(user._id));
      }
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, authLoading, user._id, user.role, navigate]);

  useEffect(() => {
    if (user) {
      socket.current = io(window.electron.APIBASEURI as string) as ISocket;
      socket.current.emit('add-user', user._id);

      socket.current.on('userStatusUpdate', (data) => {
        if (Object.keys(status).length === 0) {
          setStatus({ [data.userId]: data.active });
        } else {
          setStatus({ ...status, [data.userId]: data.active });
        }
      });

      return () => {
        socket.current?.off('userStatusUpdate');
      };
    }
  }, [user, status]);

  const handleChatChange = (chat: User) => {
    setCurrentChat(chat);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="main-container">
            <NavBar />
            <div id="chat-cont">
              <div id="search-cont">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
              </div>
              <Contacts
                contacts={users}
                changeChat={handleChatChange}
                status={status}
                searchQuery={searchQuery}
              />
              {Object.keys(currentChat).length === 0 ? (
                <ChatWallpaper />
              ) : (
                <ChatContainer currentChat={currentChat} socket={socket} />
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AdminChat;
