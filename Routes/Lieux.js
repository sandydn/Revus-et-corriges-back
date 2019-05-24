const express = require ("express")

const router = express.Router()

router.get('/adminform/lieux', (req, res) => {
    connection.query('SELECT * FROM lieux', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de l\'élément');
        } else {
            res.json (results);
        }
    })
})

router.post('/adminform/lieux', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO lieux SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'élément');
        } else {
            res.sendStatus(200);
        }
    })
})

router.put('/adminform/lieux/:id', (req, res) => {
    const idCalendar = req.params.id;
    const formData = req.body;
    connection.query('UPDATE lieux SET ? WHERE id = ?', [formData, idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification de l\'élément");
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router