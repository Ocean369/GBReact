
import React, { useState, useEffect } from 'react';
import { Box, Button, TextareaAutosize } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// import { useDispatch } from 'react-redux';
import { addMessage, isEmpty, RobotSay } from '../../function';
import { getAuth } from "firebase/auth";
import { db } from '../../services/firebase';


const Form = React.forwardRef(({ chat, idChat }, ref) => {
    const { title } = chat;
    const auth = getAuth();
    const user = auth.currentUser;
    // const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState({});

    function updateMessage(idChat, message) {
        const key = db.ref("messages/" + idChat).push().key;
        let count = 0;
        db.ref('chats/' + idChat + '/countMessage/').get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    count = snapshot.val();
                } else {
                    console.log("No data available");
                }
            })
            .then(() => {
                const updates = {};
                updates['messages/' + idChat + '/' + key] = message;
                updates['chats/' + idChat + '/countMessage/'] = count + 1;
                return db.ref().update(updates);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    function sendMessage(e) {
        e.preventDefault();
        if (message !== '') {
            let newMess = addMessage(message, user.displayName);
            updateMessage(idChat, newMess);
            setMessage('');
        }
        ref.current.focus()
    }

    useEffect(() => {
        db.ref('messages/' + idChat).on('value',
            (snapshot) => {
                if (snapshot.exists()) {
                    setMessages(snapshot.val());
                } else {
                    console.log("No data available");
                }
            },
            (error) => {
                console.error('ERROR While processing user snapshot', error);
            })
    }, [idChat]);

    useEffect(() => {
        if (!isEmpty(messages)) {
            let lastMess = Object.entries(messages).find((element, index, array) => index === array.length - 1);
            if (lastMess[1].sender === user.displayName) {
                let newMess = addMessage(RobotSay(), title);
                setTimeout(() => { updateMessage(idChat, newMess) }, 2500);
            }
        }
        ref.current.focus()
    }, [messages]);


    return (
        <Box
            onSubmit={sendMessage}
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '20px',
                padding: '0 5px'
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
                sx={{ width: 35 }}>
                <SendIcon />
            </Button>
        </Box >
    );
})

export default Form;