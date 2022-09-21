
import React, { useEffect, useRef } from 'react';
import { Typography, Box, styled } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { messagesSelector } from '../store/MessagesReducer/selectors';
import { userNameSelector } from "../store/profile/selectors";




const useStyles = makeStyles(createStyles({
  chat: {
    width: '300px',
    height: '500px',
    border: '2px double grey',
    borderRadius: '5px',
    backgroundColor: 'rgb(168, 236, 208)',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '10px 3px',
    overflow: 'auto',
  }
}));

const Owner = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid grey;
  align-self: flex-end;
  background-color: #0ea60e;
  width: 70%;
  color: #fff4df;
  padding: 5px;

::before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  right: 5px;
  bottom: -10px;
  border: 5px solid;
  border-color: #666 #666 transparent transparent;
}

::after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  right: 6px;
  bottom: -6px;
  border: 3px solid;
  border-color: #0ea60e #0ea60e transparent transparent;
}
`

const Companion = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid grey;
  align-self: flex-start;
  background-color: white;
  width: 70%;
  color: #694f1c;
  padding: 5px;

:before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  left: 5px;
  bottom: -10px;
  border: 5px solid;
  border-color: #666 transparent transparent #666;
}

:after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: 6px;
  bottom: -6px;
  border: 3px solid;
  border-color: white transparent transparent white;
}
`




function WhoSay(props) {

  const { message } = props;
  const WHO = message.isOwner ? Owner : Companion;

  return < WHO component='div' >

    <Box component='div' sx={{
      fontSize: '18px',
      color: 'blue',
      alignSelf: `${message.isOwner ? 'flex-end' : 'flex-start'} `
    }}
    >{message.user}</Box>
    <Box component='div' sx={{
      fontSize: '16px',
    }}> {message.text} </Box>
    <Box component='div' sx={{
      fontSize: '10px',
      color: 'black',
      alignSelf: 'flex-end'
    }}>{message.time}</Box>
  </ WHO >;
}



const Chatter = React.forwardRef(({ chat }, refChat) => {

  const classes = useStyles();
  const messageList = useSelector(messagesSelector);
  const user = useSelector(userNameSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      refChat.current.scrollTop = refChat.current.scrollHeight;
    }, 0);
  }, [messageList]);

  return <>
    <Typography variant="h3" color="secondary.title">
      {chat.name}
    </Typography>
    <Box component='div' className={classes.chat} ref={refChat}>
      {
        messageList.find(messages => messages.id === chat.id).messages.map((mess) =>
          <WhoSay message={mess} key={mess.id} />)}
    </Box>
  </>;
})

export default Chatter;