import User from './User';
import styles from './Sidebar.module.css';

const Sidebar = ({ room, users }) => (
  <div className={styles.sidebar}>
    <section className={styles.sidebarRoom}>
      <div className={styles.roomText}>
        <h5>Room</h5>
        <h2>{room}</h2>
      </div>
    </section>
    <section>
      <div className={styles.roomText}>
        <h5>Users</h5>
        <div>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Sidebar;
