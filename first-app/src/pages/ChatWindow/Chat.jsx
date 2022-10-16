import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import Chatter from './Chatter';
import Form from './Form';
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { db } from '../../services/firebase';


function Chat() {
    const refChat = useRef(null);
    const refText = useRef(null);
    const { chatId } = useParams();
    const [chat, setChat] = useState({});
    const [messages, setMessages] = useState({});
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate('');

    React.useEffect(() => {
        if (user) {
            db.ref('chats/' + chatId).once('value')
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setChat(snapshot.val());
                    } else {
                        console.log('No data available...');
                    }
                })
                .catch((err) => {
                    console.error('ERROR While processing user snapshot', err)
                })
            db.ref('messages/' + chatId).on('value',
                (snapshot) => {
                    if (snapshot.exists()) {
                        setMessages(snapshot.val());
                    } else {
                        console.log('No data available...');
                    }
                },
                (error) => {
                    console.error('ERROR While processing user snapshot', error);
                }
            )
        } else {
            navigate('/');
        }

    }, [])

    return (
        <div className='chat'>
            <Chatter ref={refChat} chat={chat} messages={messages} />
            <Form ref={refText} chat={chat} idChat={chatId} />
        </div>
    )
}

export default Chat