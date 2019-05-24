const express = require ("express")

const router = express.Router()


router.get('/adminform/video', (req, res) => {
    connection.query('SELECT * FROM video', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de l\'élément');
        } else {
            res.json (results);
        }
    })
})

router.post('/adminform/video', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO video SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'élément');
        } else {
            res.sendStatus(200);
        }
    })
})

router.put('/adminform/video/:id', (req, res) => {
    const idCalendar = req.params.id;
    const formData = req.body;
    connection.query('UPDATE video SET ? WHERE id = ?', [formData, idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification de l\'élément");
        } else {
            res.sendStatus(200);
        }
    });
});

router.delete('/adminform/video/:id', (req, res) => {
    const idCalendar = req.params.id;
    connection.query('DELETE FROM video WHERE id = ?', [idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la suppression de l\'élément");
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router