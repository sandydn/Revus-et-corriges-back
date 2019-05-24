const express = require ("express")

const router = express.Router()

router.get('/adminform/cinemaHasDistributeurEditeur', (req, res) => {
    connexion.query('SELECT * FROM cinemaHasDistributeurEditeur', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de l\'élément');
        } else {
            res.json (results);
        }
    })
})

router.post('/adminform/cinemaHasDistributeurEditeur', (req, res) => {
    const formData = req.body;
    connexion.query('INSERT INTO cinemaHasDistributeurEditeur SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'élément');
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router