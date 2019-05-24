const express = require ("express")

const router = express.Router()

router.get('/adminform/events', (req, res) => {
    connection.query('SELECT * FROM events', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des événements');
        } else {
            res.json (results);
        }
    })
})

router.post('/adminform/events', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO events SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'événement');
        } else {
            res.sendStatus(200);
        }
    })
})

router.put('/adminform/events/:id', (req, res) => {
    const idCalendar = req.params.id;
    const formData = req.body;
    connection.query('UPDATE events SET ? WHERE id = ?', [formData, idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification de l\'événement");
        } else {
            res.sendStatus(200);
        }
    });
});

router.delete('/adminform/events/:id', (req, res) => {
    const idCalendar = req.params.id;
    connection.query('DELETE FROM events WHERE id = ?', [idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la suppression de l\'événement");
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router