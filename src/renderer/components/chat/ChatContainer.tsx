import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { useAlert } from 'react-alert';
import { v4 as uuidv4 } from 'uuid';

import getTime from '../../utils/timeUtilities';
import deleteChatIcon from '../../../public/icons/delete_white_24dp.svg';
import {
  getOldMessages,
  sendMessages,
  clearErrors,
} from '../../redux/dispatchers/messageDispatcher';
import ChatInput from './ChatInput';
import { ISocket, Message, User } from '../../redux/types/reducerTypes';

const ChatContainer = ({
  currentChat,
  socket,
}: {
  currentChat: User;
  socket: React.MutableRefObject<ISocket | null>;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const [messages, setMessages] = useState([] as Message[]);
  const [sendMessage, setSendMessage] = useState('');

  const {
    messages: oldMessages,
    isSend,
    error,
  } = useAppSelector((state) => state.message);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOldMessages(currentChat._id, user._id));
  }, [currentChat._id, user._id, dispatch]);

  useEffect(() => {
    setMessages(oldMessages);
  }, [oldMessages]);

  // If errors occured
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error]);

  // When message sends successfully
  useEffect(() => {
    if (isSend) {
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: sendMessage, time: getTime() });
      setMessages(msgs);
    }
  }, [messages, isSend, sendMessage]);

  // When new messages are received
  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (msg, time) => {
        setMessages((prev) => [
          ...prev,
          { fromSelf: false, message: msg, time: time },
        ]);
        // window.electron.notificationApi.sendNotification(msg);
      });
      const webSocket = socket.current;
      return () => {
        webSocket?.off('msg-receive');
      };
    }
  }, [socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMsg = (
    e: React.FormEvent<HTMLFormElement>,
    msg: string,
    time: string
  ) => {
    e.preventDefault();

    setSendMessage(msg);
    socket.current?.emit('send-msg', {
      to: currentChat._id,
      from: user._id,
      msg,
      time,
    });

    dispatch(sendMessages(currentChat._id, user._id, msg, time));
  };

  return (
    <Fragment>
      <div id="chat-name">
        <span>{currentChat.userName}</span>
        <img src={deleteChatIcon} alt="delete chat" />
      </div>
      <div id="msg-list">
        {messages &&
          messages.map((message) => {
            return (
              <div
                key={uuidv4()}
                ref={scrollRef}
                className={`msg-row ${
                  message.fromSelf ? 'your-msg' : 'their-msg'
                }`}
              >
                <div className="msg-text">{message.message}</div>
                <div className="msg-time">{message.time}</div>
              </div>
            );
          })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Fragment>
  );
};

export default ChatContainer;
