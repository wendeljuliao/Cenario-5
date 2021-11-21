const router = require('express').Router();

const users = [
    {
        id: 0,
        email: "teste@hotmail.com",
        senha: "123",
        nome: "teste",
        dia: "01",
        mes: "Abril",
        ano: "2000",
        sexo: "Masculino",
        noticias: true,
        termos: true,
        playlists: [
            {
                id: 0,
                title: "Lil Nas X",
                sub: "A melhor",
                imagem: "/Images/Industry_Baby.png",
                musicas: [
                    {
                        id_musica: 0,
                        Cantor: "Lil Nas X",
                        titulo_musica: "Industry Baby",
                        imagem: "/Images/Industry_Baby.png",
                        musica: "/musicas/INDUSTRY_BABY.mp3"
                    }
                ]
            }
        ]
    },
    {
        id: 1,
        email: "teste2@hotmail.com",
        senha: "1234",
        nome: "teste 2",
        dia: "01",
        mes: "Março",
        ano: "2000",
        sexo: "Masculino",
        noticias: true,
        termos: true,
        playlists: [
            {
                id: 0,
                title: "Lil Nas X",
                sub: "A melhor",
                imagem: "/Images/Industry_Baby.png",
                musicas: [
                    {
                        id_musica: 0,
                        Cantor: "Lil Nas X",
                        titulo_musica: "Industry Baby",
                        imagem: "/Images/Industry_Baby.png",
                        musica: "/musicas/INDUSTRY_BABY.mp3"
                    }
                ]
            }
        ]
    }
]


// ACHAR ESPECIFICO USUARIO
router.get('/:id', (req, res) => {
    const paramId = req.params.id;
    const user = users.find((u) => u.id === parseInt(paramId));
    return res.json(user)
})

// ADICIONAR USUARIO
router.post('/', (req, res) => {
    const user = req.body;
    users.push(user);

    return res.json(user);
})

// ATUALIZAR USUARIO
router.put('/update/:id', (req, res) => {
    const paramId = req.params.id;
    const newUser = req.body;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(paramId)) {
            users[i] = newUser;
        }
    }


    return res.json(users);
})


// PROCURAR EMAIL DE USUARIO
router.get('/', (req, res) => {
    const paramEmail = req.query.email;

    const user = users.find((u) => u.email === paramEmail);

    return res.json(user)

})

// PROCURAR PLAYLISTS DE UM USUARIO
router.get('/:id/playlists', (req, res) => {
    const paramId = req.params.id;
    const user = users.find((u) => u.id === parseInt(paramId));

    if (user != undefined) {
        return res.json(user.playlists);

    } else {
        res.status(500).send('Usuário não encontrado!');

    }
})

// ADICIONAR PLAYLIST EM UM USUARIO
router.post('/:id/playlists', (req, res) => {
    const paramId = req.params.id;
    const user = users.find((u) => u.id === parseInt(paramId));

    if (user != undefined) {
        const playlist = req.body;
        user.playlists.push(playlist)
        return res.json(playlist);

    } else {
        res.status(500).send('Usuário não encontrado!');

    }
})

// PROCURAR ESPECIFICA PLAYLIST DE UM USUARIO
router.get('/:id/playlists/:pid', (req, res) => {
    const paramId = req.params.id;
    const user = users.find((u) => u.id === parseInt(paramId));
    if (user != undefined) {
        const playlistId = req.params.pid;
        const playlist = user.playlists.find((p) => p.id === parseInt(playlistId));
        return res.json(playlist);
    } else {
        res.status(500).send('Usuário não encontrado!');
    }

    
})

// PROCURAR MUSICAS DE UMA PLAYLIST DE UM USUARIO
router.get('/:id/playlists/:pid/musicas', (req, res) => {
    const paramId = req.params.id;
    const user = users.find((u) => u.id === parseInt(paramId));

    if (user != undefined) {
        const playlistId = req.params.pid;
        const playlist = user.playlists.find((p) => p.id === parseInt(playlistId));
        if (playlist != undefined) {
            return res.json(playlist.musicas);

        } else {
            res.status(500).send('Playlist não encontrada!');

        }
    } else {
        res.status(500).send('Usuário não encontrada!');
    }

})

// ADICIONAR MUSICA EM UMA PLAYLIST DE UM USUARIO
router.post('/:id/playlists/:pid/musicas', (req, res) => {
    const paramId = req.params.id;
    const user = users.find((u) => u.id === parseInt(paramId));

    if (user != undefined) {
        const playlistId = req.params.pid;
        const playlist = user.playlists.find((p) => p.id === parseInt(playlistId));
        if (playlist != undefined) {
            const musica = req.body;
            playlist.musicas.push(musica);
            return res.json(musica);

        } else {
            res.status(500).send('Playlist não encontrada!');

        }
    } else {
        res.status(500).send('Usuário não encontrada!');
    }

})

// DELETAR ESPECIFICA MUSICA DE UMA PLAYLIST DE UM USUARIO
router.delete('/:id/playlists/:pid/musicas/:mid', (req, res) => {
    const paramId = req.params.id;
    const user = users.find((u) => u.id === parseInt(paramId));

    if (user != undefined) {
        const playlistId = req.params.pid;
        const playlist = user.playlists.find((p) => p.id === parseInt(playlistId));
        if (playlist != undefined) {
            const musicaId = req.params.mid;
            let musica;
            for (let i = 0; i < playlist.musicas.length; i++) {
                if (playlist.musicas[i].id_musica === parseInt(musicaId)) {
                    musica = playlist.musicas.splice(i, 1);
                }
            }

            return res.json(musica);

        } else {
            res.status(500).send('Playlist não encontrada!');

        }
    } else {
        res.status(500).send('Usuário não encontrada!');
    }

})

module.exports = router;