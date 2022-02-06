import styles from './Message.module.css';

const Message = ({ msg, currentUser }) => {
  const messageStyles = [styles.message];
  const userIsMe = currentUser === msg.username;
  const userIsAdmin = msg.username === 'Admin';

  if (userIsMe) {
    messageStyles.push(styles.self);
  } else if (userIsAdmin) {
    messageStyles.push(styles.admin);
  } else {
    messageStyles.push(styles.users);
  }

  return (
    <div className={messageStyles.join(' ')}>
      <div className={styles.messageHeader}>
        <div>{msg.username !== 'Admin' ? msg.username : ''}</div>
        <div>{msg.username !== 'Admin' ? msg.time : ''}</div>
      </div>
      <div className={styles.messageContent}>
        <div>{msg.text}</div>
      </div>
    </div>
  );
};

export default Message;
