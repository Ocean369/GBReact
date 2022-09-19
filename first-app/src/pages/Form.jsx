
import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextareaAutosize } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { RobotSay } from '../store/messages/selectors';



const Form = React.forwardRef(({ chat }, ref) => {
    const messageList = useSelector(state => state.messageList);
    const user = useSelector(state => state.user.name);
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const id = chat.id;

    function sendMessage(e) {
        e.preventDefault();
        dispatch({ type: 'addMessage', message: message, user: user, chat: chat });
        setMessage('');
    }

    useEffect(() => {
        const find = messageList.find(messages => messages.id === chat.id);
        const messagesChat = find.messages;
        if (messagesChat.length) {
            if (messagesChat[messagesChat.length - 1].isOwner) {
                setTimeout(() => {
                    dispatch({ type: 'addMessage', message: RobotSay(), user: chat.name, chat: chat });
                    ref.current.focus()
                }
                    , 1500);
            }
        }

    }, [messageList]);

    return (
        <Box
            onSubmit={sendMessage}
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1
            }}
            noValidate
            autoComplete="off"
        >
            <TextareaAutosize ref={ref}
                aria-label="empty textarea"
                style={{
                    width: 230, height: 30,
                    borderRadius: 10, overflow: 'scroll'
                }}
                autoFocus={true}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button
                type='submit'
                variant="contained"
                sx={{ width: 45 }}>
                <SendIcon />
            </Button>
        </Box >
    );
})

export default Form;