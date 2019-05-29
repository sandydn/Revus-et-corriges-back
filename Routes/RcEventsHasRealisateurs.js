const express = require ("express")

const router = express.Router()

router.get('/RcEventsHasRealisateurs', (req, res) => {
    connection.query('SELECT * FROM RcEventsHasRealisateurs', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des informations');
        } else {
            res.json (results);
        }
    })
})

router.post('/RcEventsHasRealisateurs', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO RcEventsHasRealisateurs SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'élément');
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router