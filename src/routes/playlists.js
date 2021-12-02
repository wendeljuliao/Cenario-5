const router = require('express').Router();

var { MongoClient, ObjectId } = require('mongodb');
var url = "mongodb://localhost:27017/";


// ACHAR PLAYLISTS
router.get('/', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Spotify");
        dbo.collection("playlists").find({}).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.json(result);

        })

    })

})

// ACHAR ESPECIFICA PLAYLIST
router.get('/:id', (req, res) => {
    const id = req.params.id;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Spotify");
        dbo.collection("playlists").findOne({_id: ObjectId(id)}, function (err, result) {
            if (err) throw err;
            console.log(result)
            db.close();
            return res.json(result);

        })

    })
})


module.exports = router;