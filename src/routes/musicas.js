const router = require('express').Router();

const musicas = [
    {
        id_musica: 0,
        Cantor: "Lil Nas X",
        titulo_musica: "Industry Baby",
        imagem: "/Images/Industry_Baby.png",
        musica: "/musicas/INDUSTRY_BABY.mp3"
    },
    {
        id_musica: 1,
        Cantor: "Lil Nas X 2",
        titulo_musica: "Industry Baby 2",
        imagem: "/Images/Industry_Baby.png",
        musica: "/musicas/INDUSTRY_BABY.mp3"
    },
    {
        id_musica: 2,
        Cantor: "Lil Nas X 3",
        titulo_musica: "Industry Baby 3",
        imagem: "/Images/Industry_Baby.png",
        musica: "/musicas/INDUSTRY_BABY.mp3"
    }
]

// ACHAR ESPECIFICA MUSICA
router.get('/:id', (req, res) => {
    const paramId = req.params.id;
    const musica = musicas.find((m) => m.id_musica === parseInt(paramId));

    return res.json(musica);
})

// ADICIONAR MUSICA
router.post('/', (req, res) => {
    const musica = req.body;
    musicas.push(playlist)

    return res.json(musica);
})

// BUSCAR MUSICAS POR TITULO DA MUSICA OU NOME CANTOR 
router.get('/', (req, res) => {
    const paramNome = req.query.nome;

    if (paramNome) {

        const nomeMusica = musicas.find((m) => m.titulo_musica === paramNome);
        const nomeCantor = musicas.find((m) => m.Cantor === paramNome);

        if (nomeMusica != undefined) {
            return res.json(nomeMusica)
        }

        if (nomeCantor != undefined) {
            return res.json(nomeCantor)
        }
    } else {
        return res.json(musicas);
    }

    res.status(500).send('Nada encontrado!');

})



module.exports = router;