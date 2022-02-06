import { useEffect, useRef, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import styles from './Chat.module.css';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Header from './Header';
import Sidebar from './Sidebar';
import Message from './Message';

let socket;

const Chat = ({ location }) => {
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Grab username and room from the url
    const { username, room } = queryString.parse(location.search);
    setCurrentUser(username);

    // Start a socket.io connection
    socket = io('http://localhost:5000');

    // Get new emited messages from the server, add to messages array
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    // Send username and room to the server
    socket.emit('joinRoom', { username, room }, (error) => {
      if (error) alert(error);
    });

    // Get room name and room users
    socket.on('roomUsers', ({ room, users }) => {
      setRoom(room);
      setUsers(users);
    });
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      // Send new message to the server
      socket.emit('chatMessage', message);
      setMessage('');
    }
  };

  const handleDisconnect = () => {
    // Disconnect User
    socket.disconnect();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.chat}>
      <Header handleDisconnect={handleDisconnect} />
      <div className={styles.content}>
        <Sidebar room={room} users={users} />
        <div className={styles.messageContent}>
          <div className={styles.messageArea}>
            {messages.map((msg, i) => (
              <Message key={i} currentUser={currentUser} msg={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.messageForm}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                id="fullWidth"
                color="secondary"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <IconButton
                type="submit"
                sx={{
                  backgroundImage:
                    'linear-gradient(to bottom right, #884af7, #b749ff)',
                  color: '#fff',
                  width: '55px',
                  transform: 'rotate(-45deg)',
                }}
              >
                <SendIcon />
              </IconButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
