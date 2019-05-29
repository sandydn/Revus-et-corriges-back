const express = require ("express")

const router = express.Router()

router.get('/decoration', (req, res) => {
    connection.query('SELECT * FROM decoration', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de la décoration');
        } else {
            res.json (results);
        }
    })
})

router.post('/decoration', (req, res) => {
    const formData = req.body;

    connection.query('INSERT INTO decoration SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors du changement de la décoration');
        } else {
            res.sendStatus(200);
        }
    })
})

router.put('/decoration/:id', (req, res) => {
    const idCalendar = req.params.id;
    const formData = req.body;
    connection.query('UPDATE decoration SET ? WHERE id = ?', [formData, idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification de la décoration");
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router