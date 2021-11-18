const router = require('express').Router();

const playlists = [
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
    },
    {
        id: 1,
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

// ACHAR PLAYLISTS
router.get('/', (req, res) => {
    return res.json(playlists);
})

// ACHAR ESPECIFICA PLAYLIST
router.get('/:id', (req, res) => {
    const paramId = req.params.id;
    const playlist = playlists.find((p) => p.id === parseInt(paramId))
    return res.json(playlist);
})


module.exports = router;