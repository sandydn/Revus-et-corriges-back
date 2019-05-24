const express = require ("express")

const router = express.Router()


router.get('/adminform/distributeurEditeur', (req, res) => {
    connection.query('SELECT * FROM distributeurEditeur', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de l\'élément');
        } else {
            res.json (results);
        }
    })
})

router.post('/adminform/distributeurEditeur', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO distributeurEditeur SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'élément');
        } else {
            res.sendStatus(200);
        }
    })
})

router.put('/adminform/distributeurEditeur/:id', (req, res) => {
    const idCalendar = req.params.id;
    const formData = req.body;
    connection.query('UPDATE distributeurEditeur SET ? WHERE id = ?', [formData, idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification de l\'élément");
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router