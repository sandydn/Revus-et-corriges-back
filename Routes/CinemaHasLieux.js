const express = require ("express")

const router = express.Router()

router.get('/cinemaHasLieux', (req, res) => {
    connection.query('SELECT * FROM cinemaHasLieux', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de l\'élément');
        } else {
            res.json (results);
        }
    })
})

router.post('/cinemaHasLieux', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO cinemaHasLieux SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'élément');
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router