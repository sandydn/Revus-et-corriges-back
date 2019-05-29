const express = require ("express")

const router = express.Router()

router.get('/videoEditeur', (req, res) => {
    connection.query('SELECT * FROM videoEditeur', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des informations');
        } else {
            res.json (results);
        }
    })
})

router.post('/videoEditeur', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO videoEditeur SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'élément');
        } else {
            res.sendStatus(200);
        }
    })
})

router.put('/videoEditeur/:id', (req, res) => {
    const idCalendar = req.params.id;
    const formData = req.body;
    connection.query('UPDATE videoEditeur SET ? WHERE id = ?', [formData, idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification de l\'élément");
        } else {
            res.sendStatus(200);
        }
    });
});

router.delete('/videoEditeur/:id', (req, res) => {
    const idCalendar = req.params.id;
    connection.query('DELETE FROM videoEditeur WHERE id = ?', [idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la suppression de l\'élément");
        } else {
            res.sendStatus(200);
        }
    })
})


module.exports = router