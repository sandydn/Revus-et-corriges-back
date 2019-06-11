const express = require("express");
const connection = require('../conf');

const router = express.Router()

router.get('/adminform', (req, res) => {
    connection.query('SELECT * FROM admin', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des informations');
        } else {
            res.json (results);
        }
    })
})

router.post('/adminform', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO admin SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send ('Erreur lors de l\'enregistrement de l\'élément');
        } else {
            res.sendStatus(200);
        }
    })
})

router.put('/adminform/:id', (req, res) => {
    const idCalendar = req.params.id;
    const formData = req.body;
    connection.query('UPDATE admin SET ? WHERE idAdmin = ?', [formData, idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification de l\'enregistrement");
        } else {
            res.sendStatus(200);
        }
    });
});

router.delete('/adminform/:id', (req, res) => {
    const idCalendar = req.params.id;
    connection.query('DELETE FROM admin WHERE idAdmin = ?', [idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la suppression de l\'élément");
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router