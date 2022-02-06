import { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import styles from './Home.module.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h1>Converse</h1>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardContentField}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className={styles.cardContentField}>
          <FormControl fullWidth>
            <InputLabel id="room-select-label">Room</InputLabel>
            <Select
              fullWidth
              labelId="room-select-label"
              id="simple-select"
              value={room}
              label="Room"
              required
              onChange={(event) => setRoom(event.target.value)}
            >
              <MenuItem value={'react'}>React</MenuItem>
              <MenuItem value={'angular'}>Angular</MenuItem>
              <MenuItem value={'vue'}>Vue</MenuItem>
              <MenuItem value={'svelte'}>Svelte</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={styles.cardContentField}>
          <Link
            onClick={(e) => (!username || !room ? e.preventDefault() : null)}
            to={`/chat?username=${username}&room=${room}`}
          >
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={!username || !room}
              sx={{
                background: '#40415f',
                padding: '16px 8px',
              }}
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
