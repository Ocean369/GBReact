import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

function Item(props) {
    const { chat, length, index } = props;

    return <>
        <ListItem alignItems="center">
            <ListItemAvatar>
                <Avatar alt={chat.name} src="/static/images/avatar/l1.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary={chat.name}
            />
        </ListItem>
        <Box>
            {(index < length - 1) ?
                <Divider variant="inset" component="li" /> : ''}
        </Box>


    </>
}

export default function ChatList(props) {
    const { chats } = props;
    const length = chats.length;

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {chats.map((chat, index) =>
                <Item chat={chat} key={chat.id} length={chats.length} index={index} />
            )}

        </List>
    );
}

