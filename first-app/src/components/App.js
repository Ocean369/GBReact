
import './App.sass';

import ChatList from '../pages/ChatList';
import NotFound from '../pages/NotFound';
import Chat from '../pages/Chat';
import CustomizedList from '../pages/Profile';
import User from '../pages/User';
import { useSelector } from 'react-redux';
import React, { } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { chatsSelector } from '../store/ChatsReducer/selectors';


export default function App() {

  const chatList = useSelector(chatsSelector);

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

          {/* {chatList.map(chat => {
            let path = `/chats/${chat.id}`; */}

          return <Route path='/chats/:chatId'
            element={<Chat />} />
          {/* })} */}

          <Route path="/chats" element={<ChatList />} />

          <Route path="/user" element={<CustomizedList />} />
          <Route path={'*'} element={<NotFound />} />

        </Routes>
      </div>
    </div>

  );
}





