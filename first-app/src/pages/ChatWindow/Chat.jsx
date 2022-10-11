import React, { useRef } from 'react';
import { useParams } from 'react-router';
import Chatter from './Chatter';
import Form from './Form';
import { Box, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { chatsSelector } from '../../store/ChatsReducer/selectors';
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";


function Chat() {
    const refChat = useRef(null);
    const refText = useRef(null);
    const { chatId } = useParams();
    const chatList = useSelector(chatsSelector);
    const findChat = chatList.find(chat => chat.id === chatId)
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate('');

    React.useEffect(() => {
        if (user) {

        } else {
            navigate('/');
        }

    }, [])

    return (
        <div component='div' className='chat'>
            <Chatter ref={refChat} chat={findChat} />
            <Form ref={refText} chat={findChat} />
        </div>
    )
}

export default Chat