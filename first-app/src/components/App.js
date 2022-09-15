
import './App.sass';
import Form from '../pages/Form';
import Chatter from '../pages/Chatter';
import ChatList from '../pages/ChatList';
import NotFound from '../pages/NotFound';
import Chat from '../pages/Chat';
import CustomizedList from '../pages/Profile';
import User from '../pages/User';
import { CHATLIST } from './DataList';
import { Box, styled } from '@mui/material';
import { getIdChat, updateChatList, createChatList } from '../pages/function';



import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from "react-router-dom";


export default function App(props) {

  const [chatList, setChatList] = useState(CHATLIST);

  const search = useRef(null);

  function handleSubmitChatList(event) {
    event.preventDefault();
    let newChat = event.target[1].value;
    if (newChat !== '') {
      setChatList(createChatList(newChat, chatList));
      event.target[1].value = '';
    }
  }

  function handleSubmitChat(messageList, id) {
    updateChatList(id, chatList, messageList);
  }

  return (
    <div >
      <nav className='nav'>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user">Профиль</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
        </ul>
      </nav>

      <div className='display'>
        <Routes >
          <Route path="/" element={<User />} />

          {chatList.map(chat => {
            let path = `/chat/${chat.name.split(/\s+/).join('')}`;

            return <Route path={path} key={chat.id}
              element={<Chat chat={chat} onSubmit={handleSubmitChat} />} />
          })}

          <Route path="/chat" element={<ChatList ref={search}
            onSubmit={handleSubmitChatList} chatList={chatList} />} />

          <Route path="/user" element={<CustomizedList />} />
          <Route path={'*'} element={<NotFound />} />

        </Routes>
      </div>
    </div>

  );
}





