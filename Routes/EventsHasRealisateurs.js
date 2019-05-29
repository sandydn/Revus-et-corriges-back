const express = require ("express")
const connection = require('../conf');

const router = express.Router()

router.get('/eventsHasRealisateurs', (req, res) => {
    connection.query('SELECT * FROM eventsHasRealisateurs', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de l\'élément');
        } else {
            res.json (results);
        }
    })
})

router.post('/eventsHasRealisateurs', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO eventsHasRealisateurs SET ?', formData ,(err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'élément');
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router