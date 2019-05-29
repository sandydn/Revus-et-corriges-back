const express = require ("express")
const connection = require('../conf');

const router = express.Router()

router.get('/videoHasRealisateurs', (req, res) => {
    connection.query('SELECT * FROM videoHasRealisateurs', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de l\'élément');
        } else {
            res.json (results);
        }
    })
})

router.post('/videoHasRealisateurs', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO videoHasRealisateurs SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'élément');
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router