const router = require('express').Router();

var { MongoClient, ObjectId } = require('mongodb');
var url = "mongodb://localhost:27017/";

// ACHAR ESPECIFICA MUSICA
router.get('/:id', (req, res) => {
    const id = req.params.id;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Spotify");
        dbo.collection("musicas").findOne({_id: ObjectId(id)}, function (err, result) {
            if (err) throw err;
            console.log(result)
            db.close();
            return res.json(result);

        })

    })
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
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Spotify");
            dbo.collection("musicas").find({}).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                return res.json(result);

            })

        })
    }


})



module.exports = router;