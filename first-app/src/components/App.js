
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
import { useSelector, useDispatch } from 'react-redux';



import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from "react-router-dom";


export default function App() {

  const messageList = useSelector(state => state.messageList);
  const chatList = useSelector(state => state.chatList);
  const user = useSelector(state => state.user.name);


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
            <Link to="/chats">Chat</Link>
          </li>
        </ul>
      </nav>

      <div className='display'>
        <Routes >
          <Route path="/" element={<User />} />

          {chatList.map(chat => {
            let path = `/chats/${chat.id}`;
            return <Route path={path} key={chat.id}
              element={<Chat chat={chat} />} />
          })}

          <Route path="/chats" element={<ChatList />} />

          <Route path="/user" element={<CustomizedList />} />
          <Route path={'*'} element={<NotFound />} />

        </Routes>
      </div>
    </div>

  );
}





