const express = require('express');
const cors = require('cors');

const app = express();

// É um mecanismo utilizado pelos navegadores para compartilhar recursos entre diferentes origens - Próximo cenário vai ser importante
app.use(cors());
// É um método embutido no express para reconhecer o objeto de solicitação de entrada como um objeto JSON
app.use(express.json());
// É um método embutido no express para reconhecer o objeto de solicitação recebido como strings ou matrizes
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routes/users');
const playlistRouter = require('./routes/playlists');
const musicRouter = require('./routes/musicas');

app.use('/users', userRouter);
app.use('/playlists', playlistRouter);
app.use('/musicas', musicRouter);

app.listen(3001);