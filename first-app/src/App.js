
import './App.sass';
import React, { useState, useEffect, useRef } from 'react';
const chat = React.createRef();

function RobotSay() {
  const speech = [
    'Ваше сообщение принято в обработку.',
    'Спасибо, что уделили нам время.'
  ]
  let n = Math.floor(Math.random() * 2);
  return speech[n];
}


function WhoSay(props) {
  const { message } = props;

  return <div className={message.isOwner ? 'owner' : 'companion'}>
    <div className='chat-user_name'>{message.user}</div>
    <div className='chat-user_text'> {message.text} </div>
    <div className='chat-user_time'>{message.time}</div>
  </div>;
}



const Chatter = React.forwardRef((props, ref) => {
  const List = props.messageList;
  // const chat = useRef(null);

  return <>
    <h1> Болталка </h1>
    <div className='chat' ref={ref} >
      {List.map((mes) =>
        <WhoSay message={mes} />)}
    </div>
  </>;
})

function Form(props) {
  return (
    <form onSubmit={props.onSubmit} className='chatter'>
      <textarea className='App-textarea'>
      </textarea>
      <button type='submit'>Отправить</button>
    </form>
  );
}

function updateMessageList(messages, message, user) {

  let isOwner = true;
  if (user === 'robot') isOwner = false
  let time = new Date();
  let hours = time.getHours();
  let min = time.getMinutes();
  let mes = {
    user: user,
    text: message,
    time: `${hours}:${min}`,
    isOwner: isOwner
  };

  messages = messages.slice()
  messages.push(mes);
  return messages
}


function App(props) {
  console.log('app init');
  const user = props.userName;
  const [messageList, setMessageList] = useState([]);
  const chat = useRef(null);

  useEffect(() => {
    if (messageList.length > 0) {
      if (messageList[messageList.length - 1].user !== 'robot') {
        var idTimeOut = setTimeout(() =>
          setMessageList(updateMessageList(messageList, RobotSay(), 'robot'))
          , 1000);
      }
      setTimeout(() => {
        chat.current.scrollTop = chat.current.scrollHeight;
      }, 0)
    }
    return () => {
      clearTimeout(idTimeOut);
    }
  }, [messageList]
  );


  function handleSubmit(e) {
    console.log('click button');
    e.preventDefault();
    console.log('user-', user);
    setMessageList(updateMessageList(messageList, e.target.children[0].value, user));

    e.target.children[0].value = '';
  }


  return (
    <div className="App">
      <Chatter ref={chat} messageList={messageList} />
      <Form onSubmit={handleSubmit} />
    </div>
  );
}




export default App;
