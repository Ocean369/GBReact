import React, { useState, useEffect, useRef } from 'react';
import Chatter from './Chatter';
import Form from './Form';
import { Box, styled } from '@mui/material';
import { getId, updateMessageList, RobotSay } from './function';
import { useSelector, useDispatch } from 'react-redux';


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


function Chat({ chat }) {
    const refChat = useRef(null);
    const refText = useRef(null);

    return (
        <CHAT component='div'>
            <Chatter ref={refChat} chat={chat} />
            <Form ref={refText} chat={chat} />
        </CHAT>
    )
}

export default Chat