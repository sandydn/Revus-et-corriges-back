const express = require ("express")
const connection = require('../conf');

const router = express.Router()

router.get('/rcevents', (req, res) => {
    connection.query('SELECT * FROM rcevents', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des informations');
        } else {
            res.json (results);
        }
    })
})

router.post('/rcevents', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO rcevents SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'élément');
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router