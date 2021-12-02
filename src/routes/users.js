const router = require('express').Router();

var { MongoClient, ObjectId } = require('mongodb');
var url = "mongodb://localhost:27017/";


// ACHAR ESPECIFICO USUARIO
router.get('/:id', (req, res) => {
    const id = req.params.id;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Spotify");
        dbo.collection("users").findOne({ _id: ObjectId(id) }, function (err, result) {
            if (err) throw err;
            console.log(result)
            db.close();
            return res.json(result);

        })

    })
})

// ADICIONAR USUARIO
router.post('/', (req, res) => {
    const user = req.body;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Spotify");
        dbo.collection("users").insertOne(user, function (err, result) {
            if (err) throw err;
            console.log(result)
            db.close();
            return res.json(result);

        })

    })

})

// ATUALIZAR USUARIO
router.put('/update/:id', (req, res) => {
    const paramId = req.params.id;
    const userUpdate = req.body;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Spotify");
        dbo.collection("users").updateOne({ _id: ObjectId(paramId) }, { $set: userUpdate }, function (err, result) {
            if (err) throw err;
            console.log(result.modifiedCount);
            db.close();
            return res.json(result.modifiedCount);
        })

    })
})


// PROCURAR EMAIL DE USUARIO
router.get('/', (req, res) => {
    const paramEmail = req.query.email;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Spotify");
        dbo.collection("users").find({ email: paramEmail }).toArray(function (err, result) {
            if (err) throw err;
            console.log(result)
            db.close();
            return res.json(result);

        })

    })

})

// PROCURAR PLAYLISTS DE UM USUARIO
router.get('/:id/playlists', (req, res) => {
    const paramId = req.params.id;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Spotify");
        dbo.collection("users").findOne({ _id: ObjectId(paramId) }, function (err, result) {
            if (err) throw err;
            console.log(result)
            db.close();
            return res.json(result.playlists);

        })

    })
})

// ADICIONAR PLAYLIST EM UM USUARIO
router.post('/:id/playlists', (req, res) => {
    const id = req.params.id;
    const playlist = req.body;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Spotify");
        dbo.collection("users").findOne({ _id: ObjectId(id) }, function (err, user) {
            if (err) throw err;
            user.playlists.push(playlist);

            dbo.collection("users").updateOne({ _id: ObjectId(id) }, { $set: user }, function (err, result) {
                if (err) throw err;
                db.close();
                return res.json(result);
            })

            console.log(user)




        })

    })
})

// PROCURAR ESPECIFICA PLAYLIST DE UM USUARIO
router.get('/:id/playlists/:pid', (req, res) => {
    const paramId = req.params.id;
    const playlistId = req.params.pid;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Spotify");
        dbo.collection("users").findOne({ _id: ObjectId(paramId) }, function (err, result) {
            if (err) throw err;
            console.log(result)
            db.close();
            return res.json(result.playlists.find((p) => p.id == parseInt(playlistId)));

        })

    })


})

// PROCURAR MUSICAS DE UMA PLAYLIST DE UM USUARIO
router.get('/:id/playlists/:pid/musicas', (req, res) => {
    const paramId = req.params.id;
    const playlistId = req.params.pid;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Spotify");
        dbo.collection("users").findOne({ _id: ObjectId(paramId) }, function (err, result) {
            if (err) throw err;
            console.log(result)
            db.close();

            let playlist = result.playlists.find((p) => p.id == parseInt(playlistId))

            if (playlist != undefined) {
                return res.json(playlist.musicas);
            }
            return res.status(500).send('Playlist não encontrada!');

        })

    })

})

// ADICIONAR MUSICA EM UMA PLAYLIST DE UM USUARIO
router.post('/:id/playlists/:pid/musicas', (req, res) => {
    const paramId = req.params.id;
    const playlistId = req.params.pid;
    const musicaNova = req.body;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Spotify");
        dbo.collection("users").findOne({ _id: ObjectId(paramId) }, function (err, result) {
            if (err) throw err;
            console.log(result)

            let playlist = result.playlists.find((p) => p.id == parseInt(playlistId))

            if (playlist != undefined) {
                playlist.musicas.push(musicaNova)
                dbo.collection("users").updateOne({ _id: ObjectId(paramId) }, { $set: result }, function (err, result) {
                    if (err) throw err;
                    db.close();
                    return res.json(result);
                })

            }

        })

    })
})

// DELETAR ESPECIFICA MUSICA DE UMA PLAYLIST DE UM USUARIO
router.delete('/:id/playlists/:pid/musicas/:mid', (req, res) => {
    const paramId = req.params.id;
    const playlistId = req.params.pid;
    const musicaId = req.params.mid;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Spotify");
        dbo.collection("users").findOne({ _id: ObjectId(paramId) }, function (err, result) {
            if (err) throw err;
            console.log(result)

            let playlist = result.playlists.find((p) => p.id == parseInt(playlistId))

            if (playlist != undefined) {
                for (let i = 0; i < playlist.musicas.length; i++) {
                    if (playlist.musicas[i].id_musica === parseInt(musicaId)) {
                        playlist.musicas.splice(i, 1);
                    }
                }
                dbo.collection("users").updateOne({ _id: ObjectId(paramId) }, { $set: result }, function (err, result) {
                    if (err) throw err;
                    db.close();
                    return res.json(result);
                })

            }

        })

    })

})

module.exports = router;