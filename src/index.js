const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routes/users');
const playlistRouter = require('./routes/playlists');
const musicRouter = require('./routes/musicas');

app.use('/users', userRouter);
app.use('/playlists', playlistRouter);
app.use('/musicas', musicRouter);

app.listen(3001);