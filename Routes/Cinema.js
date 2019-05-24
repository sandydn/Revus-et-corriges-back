const express = require ("express")

const router = express.Router()

router.get('/adminform/cinema', (req, res) => {
    connection.query('SELECT * FROM cinema', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de l\'élément');
        } else {
            res.json (results);
        }
    })
})

router.post('/adminform/cinema', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO cinema SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'élément');
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router