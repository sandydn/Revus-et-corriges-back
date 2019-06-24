const express = require ("express")
const connection = require('../conf');

const router = express.Router()

router.get('/events', (req, res) => {
    connection.query('SELECT * FROM events', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des événements');
        } else {
            res.json (results);
        }
    })
})

router.post('/events', (req, res) => {
    const formDataImp = req.body.importance;
    const formDataLieux = req.body.lieux;
    const formDataEvents = req.body.events;
    const joinObject = {}

    connection.beginTransaction(function (err) {

        if (err) { throw err }
        
        connection.query('INSERT INTO importance SET ?', formDataImp, (err, results) => {
            if (err) {
                return connection.rollback(_ => {
                    res
                    .status(500)
                    .send("error from importance")
                throw err
                })
            } else {
                joinObject.importance_idImportance = results.insertId
            }
        })

        connection.query('INSERT INTO events SET ?', formDataEvents, (err, results) => {
            if (err) {
                return connection.rollback(_ => {
                    res
                    .status(500)
                    .send(" erreur lors de l'insertion cinema")
                    throw err
                })
            } else {
                joinObject.events_idEvent = results.insertId
            }

            connection.query('SELECT * FROM lieux', formDataLieux, (err, results) => {
                
                const lieux = results.filter(result => result.name == formDataLieux.name)

                if (lieux.length !== 0) {
                    joinObject.lieux_idLieux = lieux.idLieux

                } else {
                    connection.query('INSERT INTO lieux SET ?', formDataLieux, (err, results) => {
                        if (err) {
                            return connection.rollback(_ => {
                                res
                                .status(500)
                                .send(" error from realisateur")
                                throw err
                            })
                        }
                    })
                    }
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(_ => {
                                res
                                    .status(500)
                                    .send(" error final commit")
                                throw err
                            })
                        }
                    })
                    res.status(200).json({ results: "send" })
                })
            }    
        )
    })
});

router.put('/events/:id', (req, res) => {
    const idCalendar = req.params.id;
    const formData = req.body;
    connection.query('UPDATE events SET ? WHERE idEvent = ?', [formData, idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification de l\'événement");
        } else {
            res.sendStatus(200);
        }
    });
});

router.delete('/events/:id', (req, res) => {
    const idCalendar = req.params.id;
    connection.query('DELETE FROM events WHERE idEvent = ?', [idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la suppression de l\'événement");
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router