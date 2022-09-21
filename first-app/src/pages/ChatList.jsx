
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { ListItemAvatar } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TextField } from '@mui/material';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_CHAT, DELETE_MESSAGES, ADD_CHAT, CREATE_MESSAGES } from '../store/actionsConstant';
import { getIdChat, createChatList } from '../function';
import { chatsSelector } from '../store/ChatsReducer/selectors';
import { userNameSelector } from "../store/profile/selectors";
import { delete_messages, create_messages } from "../store/MessagesReducer/actionCreator"
import { delete_chat, add_chat } from "../store/ChatsReducer/actionCreator"




function Item({ chat, length, index }) {
    const dispatch = useDispatch();
    let path = `/chats/${chat.id}`;

    function deleteChat(id) {
        dispatch(delete_chat(chat.id));
        dispatch(delete_messages(chat.id));
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
                        <Avatar alt={chat.name} src="/static/images/avatar/l1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={chat.name}
                    >
                    </ListItemText>
                </ListItem>
            </Link>
            <Button onClick={() => deleteChat(chat.id)}
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
    const chatList = useSelector(chatsSelector);
    const user = useSelector(userNameSelector);
    const dispatch = useDispatch();
    const length = chatList.length;
    const [newChat, setNewChat] = useState('');

    function addChat(event) {
        event.preventDefault();
        if (newChat !== '') {
            let id = getIdChat(newChat, chatList);
            let updateChatList = createChatList(newChat, chatList, id);
            dispatch(add_chat(updateChatList));
            dispatch(create_messages(id));
            setNewChat('');
        }
    }

    return (
        <List className='list' sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: '10px' }}>
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
                        width: '280px',
                        paddingBottom: '30px'
                    }}
                    value={newChat}
                    onChange={(e) => { setNewChat(e.target.value) }}
                />
            </Box>

            {chatList.map((chat, index) => {
                return <div key={chat.id}>
                    <Item chat={chat} length={length} index={index} />
                </div>
            })}
        </List>



    );
})

export default ChatList