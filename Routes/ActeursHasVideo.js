const express = require ("express")

const router = express.Router()

router.get('/acteursHasVideo', (req, res) => {
    connection.query('SELECT * FROM acteursHasVideo', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des informations');
        } else {
            res.json (results);
        }
    })
})

router.post('/acteursHasVideo', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO acteursHasVideo SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'élément');
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router