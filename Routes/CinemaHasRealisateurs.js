const express = require ("express")

const router = express.Router()


router.get('/adminform/cinemaHasRealisateurs', (req, res) => {
    connection.query('SELECT * FROM cinemaHasRealisateurs', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de l\'élément');
        } else {
            res.json (results);
        }
    })
})

router.post('/adminform/cinemaHasRealisateurs', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO cinemaHasRealisateurs SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'élément');
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router