import React, { useState, useEffect, useRef } from 'react';
import Chatter from './Chatter';
import Form from './Form';
import { Box, styled } from '@mui/material';
import { getId, updateMessageList, RobotSay } from './function';


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


function Chat(props) {
    const chat = useRef(null);
    const text = useRef(null);

    const id = props.chat.id;
    const title = props.chat.name;
    const user = 'You';
    const [messageList, setMessageList] = useState(props.chat.messageList);


    function handleSubmitForm(e) {
        e.preventDefault();
        setMessageList(updateMessageList(messageList, e.target.children[0].value, user));
        e.target.children[0].value = '';
    }

    useEffect(() => {
        if (messageList.length > 0) {
            if (messageList[messageList.length - 1].user === 'You') {
                var idTimeOut = setTimeout(() => {
                    setMessageList(updateMessageList(messageList, RobotSay(), title)); text.current.focus();
                }
                    , 1500);
            }
            setTimeout(() => {
                chat.current.scrollTop = chat.current.scrollHeight;
            }, 0)
        }

        return () => {
            clearTimeout(idTimeOut);
            props.onSubmit(messageList, id);

        }
    }, [messageList]
    );


    return (
        <CHAT component='div'>
            <Chatter ref={chat} messageList={messageList} title={title} />
            <Form ref={text} onSubmit={handleSubmitForm} />
        </CHAT>
    )
}

export default Chat