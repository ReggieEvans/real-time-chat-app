import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ handleDisconnect }) => (
  <div className={styles.header}>
    <h2>Converse</h2>
    <Link to="/" className={styles.leaveRoom} onClick={handleDisconnect}>
      <button>Leave Room</button>
    </Link>
  </div>
);

export default Header;
