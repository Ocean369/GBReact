
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { ListItemAvatar } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TextField } from '@mui/material';
import { Link } from "react-router-dom";
import { isEmpty } from '../function';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';





const Item = ({ chat, index, length, userID }) => {
    const { id, title, avatar } = chat;
    const path = `/chats/${id}`;

    const deleteChat = (id) => {
        const updates = {};
        db.ref('chats/' + id).get()
            .then((snap) => {
                if (snap.exists()) {
                    if (snap.val().countMessage !== 0) {
                        updates[`messages/${id}`] = null
                    }
                } else {
                    console.log('No data available');
                }
            })
            .then(() => {
                updates[`/users/${userID}/chats/${id}`] = null;
                updates[`/chats/${id}`] = null;
                return db.ref().update(updates);
            })
            .catch(e => console.error(e))
    }

    return <>
        <div
            style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'space-between'
            }}>
            <Link to={path} style={{
                textDecoration: 'none',
                color: 'gray'
            }}>
                <ListItem alignItems="center" >
                    <ListItemAvatar>
                        <Avatar alt={title} src={avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={title}
                    >
                    </ListItemText>
                </ListItem>
            </Link>
            <Button onClick={() => deleteChat(id)}
                sx={{ justifySelf: 'end' }}
            ><DeleteIcon /></Button>
        </div>
        <Box>
            {(index < length - 1) ?
                <Divider variant="inset" component="li" /> : ''}
        </Box>
    </>
}

const ChatList = React.forwardRef((props, ref) => {
    const [chatList, setChatList] = useState({});
    const [currentU, setCurrentUser] = useState({});
    const [newChat, setNewChat] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate('');

    useEffect(() => {
        if (user) {
            db.ref('users').child(user.uid).on('value', (snapshot) => {
                try {
                    if (snapshot.exists()) {
                        setCurrentUser(snapshot.val());
                        if (Object.hasOwn(snapshot.val(), 'chats')) {
                            setChatList(snapshot.val().chats);
                        } else {
                            setChatList({});
                        }
                    }
                    else {
                        console.log("No data available");
                    }
                }
                catch (err) {
                    console.error('ERROR While processing user snapshot', err)
                }
            })
        } else navigate('/')
    }, []);


    function addChat(event) {
        event.preventDefault();
        if (newChat !== '') {

            const key = db.ref('chats').push().key;
            const updated = {};

            if (Object.hasOwn(currentU, 'chats')) {
                updated[`users/${user.uid}/chats`] = { ...currentU.chats, [key]: newChat }
            } else {
                updated[`users/${user.uid}`] = { ...currentU, chats: { [key]: newChat } };
            }
            updated[`chats/${key}`] = { title: newChat, avatar: ' / static / images / avatar / l1.jpg', countMessage: 0 };
            db.ref().update(updated)
                .catch(err => {
                    console.error('ERROR. Data doesn`t write.', err);
                })
            setNewChat('');
        }
    }

    if (isEmpty(chatList)) {
        return (
            <Box component='div' className='list'>
                <img className='btn_profile' src="profile.png" alt="" onClick={() => navigate('/profile')} />
                <List >
                    <Box component='div'
                        sx={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            justifyContent: 'end'
                        }}>
                        <Button
                            variant="text"
                            sx={{ width: '20px' }}

                        >
                            {<AddIcon onClick={addChat} />}
                        </Button>
                        <TextField
                            ref={ref}
                            id="search"
                            label="Search"
                            type="search"
                            variant="standard"
                            sx={{
                                width: '270px',
                                paddingBottom: '30px',
                                marginRight: '10px'
                            }}
                            value={newChat}
                            onChange={(e) => { setNewChat(e.target.value) }}
                        />
                    </Box>

                </List>
            </Box>
        )
    }

    return (<Box component='div' className='list'>
        <img className='btn_profile' src="profile.png" alt="" onClick={() => navigate('/profile')} />
        <List >
            <Box component='div'
                sx={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    justifyContent: 'end'
                }}>
                <Button
                    variant="text"
                    sx={{ width: '20px' }}

                >
                    {<AddIcon onClick={addChat} />}
                </Button>
                <TextField
                    ref={ref}
                    id="search"
                    label="Search"
                    type="search"
                    variant="standard"
                    sx={{
                        width: '270px',
                        paddingBottom: '30px',
                        marginRight: '10px'
                    }}
                    value={newChat}
                    onChange={(e) => { setNewChat(e.target.value) }}
                />
            </Box>
            {
                Object.entries(chatList).map(([idChat, title], index, array) => {
                    return <Item key={idChat} chat={{ id: idChat, title: title }} index={index} length={array.length} userID={user.uid} />
                })
            }

        </List>
    </Box>
    );
})

export default ChatList