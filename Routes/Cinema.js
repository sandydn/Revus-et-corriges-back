const express = require ("express")
const connection = require('../conf');

const router = express.Router()
router.get("/", (req, res) => {
    console.log('sssssss')
})

router.get('/cinema', (req, res) => {
    connection.query('SELECT * FROM cinema', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de l\'élément');
        } else {
            res.json (results);
        }
    })
})

router.post('/cinema', (req, res) => {
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

router.put('/cinema/:id', (req, res) => {
    const idCalendar = req.params.id;
    const formData = req.body;
    connection.query('UPDATE cinema SET ? WHERE idCinema = ?', [formData, idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification de l\'enregistrement");
        } else {
            res.sendStatus(200);
        }
    });
});

router.delete('/cinema/:id', (req, res) => {
    const idCalendar = req.params.id;
    connection.query('DELETE FROM cinema WHERE idCinema = ?', [idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la suppression de l\'élément");
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router