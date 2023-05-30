import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import { getAdmins, clearErrors } from '../../redux/dispatchers/userDispatcher';

import NavBar from '../layout/NavBar';
import Loader from '../layout/Loader';
import Contacts from './Contacts';
import ChatContainer from './ChatContainer';
import ChatWallpaper from '../layout/ChatWallpaper';
import { User, ISocket, UserStatus } from '../../redux/types/reducerTypes';

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
      if (user.role === 'admin' || user.role === 'god') {
        navigate('/admin/chat');
      }
      dispatch(getAdmins());
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, navigate, user.role, authLoading]);

  if (user) {
    socket.current = io(window.electron.APIBASEURI as string) as ISocket;
    socket.current.emit('add-user', user._id);
  }

  useEffect(() => {
    socket.current?.on(
      'userStatusUpdate',
      (data: { userId: string; active: boolean }) => {
        setStatus({ ...status, [data.userId]: data.active });
      }
    );

    return () => {
      socket.current?.off('userStatusUpdate');
    };
  }, [status, socket]);

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
                searchQuery={searchQuery}
                status={status}
              />
              {currentChat === undefined ? (
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
