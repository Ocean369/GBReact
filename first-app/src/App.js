
// import './App.sass';
import Form from './Form';
import Chatter from './Chatter';
import ChatList from './ChatList';
import { Box, styled } from '@mui/material';

import React, { useState, useEffect, useRef } from 'react';

const CHATLIST = [{
  id: 'J1',
  name: 'Boris Johnson'
},
{
  id: 'T1',
  name: 'Lis Truss '
},
{
  id: 'B11',
  name: 'Geek Brains'
}];

const APP = styled(Box)`
display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #fff4df;
  color: cadetblue;
  height: 100vh;
  padding: 20px;

`
function getId(List) {
  return List.length ? List[List.length - 1].id + 1 : 0
}

function RobotSay() {
  const speech = [
    'Ваше сообщение принято в обработку.',
    'Спасибо, что уделили нам время.'
  ]
  let n = Math.floor(Math.random() * 2);
  return speech[n];
}

function updateMessageList(messages, message, user) {
  let isOwner = true;
  if (user === 'robot') isOwner = false
  let time = new Date();
  let hours = time.getHours();
  let min = time.getMinutes();
  let mes = {
    id: getId(messages),
    user: user,
    text: message,
    time: `${hours}:${min}`,
    isOwner: isOwner
  };

  messages = messages.slice()
  messages.push(mes);
  return messages
}

export default function App(props) {
  console.log('app init');
  const user = props.userName;
  const [messageList, setMessageList] = useState([]);
  const [chatList, setCatList] = useState(CHATLIST);
  const chat = useRef(null);
  const text = useRef(null);

  useEffect(() => {
    if (messageList.length > 0) {
      if (messageList[messageList.length - 1].user !== 'robot') {
        var idTimeOut = setTimeout(() => {
          setMessageList(updateMessageList(messageList, RobotSay(), 'robot')); text.current.focus();
        }
          , 1500);
      }
      setTimeout(() => {
        chat.current.scrollTop = chat.current.scrollHeight;
      }, 0)
    }

    return () => {
      clearTimeout(idTimeOut);

    }
  }, [messageList]
  );


  function handleSubmit(e) {
    console.log('click button');
    e.preventDefault();
    console.log('user-', user);
    setMessageList(updateMessageList(messageList, e.target.children[0].value, user));

    e.target.children[0].value = '';
  }


  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: 20
    }}>
      <ChatList chats={chatList} />
      <APP component='div'>
        <Chatter ref={chat} messageList={messageList} />
        <Form ref={text} onSubmit={handleSubmit} />
      </APP>
    </div>
  );
}





