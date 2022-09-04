
import './App.css';
import { useState } from 'react';

function Message(props) {
  return (<div>
    <p> Текст вашего сообщения</p>
    <div className='mess'>{props.text}</div>
  </div>);
}

function App(props) {
  const [message, setMessage] = useState('');

  return (
    <div className="App">
      <div>
        <h3>Здравствуйте, {props.name}</h3>
        <p> Введите свое сообщение</p>
        <textarea className='App-textarea' onInput={(e) => {
          setMessage(e.target.value);
        }}>
        </textarea>
      </div>
      <Message text={message} />
    </div>
  );
}

export default App;
