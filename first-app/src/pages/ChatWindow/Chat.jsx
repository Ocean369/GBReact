import React, { useRef } from 'react';
import { useParams } from 'react-router';
import Chatter from './Chatter';
import Form from './Form';
import { Box, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { chatsSelector } from '../../store/ChatsReducer/selectors';



const CHAT = styled(Box)`
display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #fff4df;
  color: cadetblue;
  height: 100vh;
  padding: 20px;

`


function Chat() {
    const refChat = useRef(null);
    const refText = useRef(null);
    const { chatId } = useParams();
    const chatList = useSelector(chatsSelector);
    const findChat = chatList.find(chat => chat.id === chatId)
    return (
        <CHAT component='div'>
            <Chatter ref={refChat} chat={findChat} />
            <Form ref={refText} chat={findChat} />
        </CHAT>
    )
}

export default Chat