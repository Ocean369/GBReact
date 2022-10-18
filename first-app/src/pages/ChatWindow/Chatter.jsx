
import React, { useEffect } from 'react';
import { Box, styled } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";




const useStyles = makeStyles(createStyles({
  chat: {
    width: '294px',
    height: '500px',
    // border: '2px double grey',
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




function WhoSay({ message, index, length }) {

  const { sender, text, time } = message;
  const user = getAuth().currentUser.displayName;
  const isOwner = sender === user ? true : false;
  const WHO = isOwner ? Owner : Companion;


  return < WHO component='div' >

    <Box component='div' sx={{
      fontSize: '18px',
      color: 'blue',
      alignSelf: `${isOwner ? 'flex-end' : 'flex-start'} `
    }}
    >{sender}</Box>
    <Box component='div' sx={{
      fontSize: '16px',
    }}> {text} </Box>
    <Box component='div' sx={{
      fontSize: '10px',
      color: 'black',
      alignSelf: 'flex-end'
    }}>{time}</Box>
  </ WHO >;
}



const Chatter = React.forwardRef(({ chat, messages }, refChat) => {
  const { title, avatar } = chat;
  const classes = useStyles();
  const navigate = useNavigate('');

  useEffect(() => {
    setTimeout(() => {
      refChat.current.scrollTop = refChat.current.scrollHeight;
    }, 0);
  }, [messages]);

  return <>
    <div className='chat_title'>
      <div className='btn_back'
        onClick={() => navigate('/chats')}>&lt; Назад</div>
      <h3>
        {title}
      </h3>
      <Avatar alt={title} src={avatar} />
    </div>
    <Box component='div' className={classes.chat} ref={refChat}>
      {
        Object.entries(messages).map(([id, message], index, array) => {
          return <WhoSay message={message} key={id} index={index} length={array.length} />
        })
      }
    </Box>
  </>;
})

export default Chatter;