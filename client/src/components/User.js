import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { purple } from '@mui/material/colors';
import styles from './User.module.css';

const User = ({ user }) => (
  <div className={styles.user}>
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: purple[900] }}>
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={user.username}
        subheader={user.room}
      />
    </Card>
  </div>
);

export default User;
