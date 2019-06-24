const express = require ("express")
const connection = require('../conf');

const router = express.Router()


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
    const formDataImp = req.body.importance;
    const formDataCinema = req.body.cinema;
    const formDataReal = req.body.realisateur;
    const formDataEdit = req.body.distributeurEditeur;
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
        
        connection.query('INSERT INTO cinema SET ?', formDataCinema, (err, results) => {
            if (err) {
                return connection.rollback(_ => {
                    res
                    .status(500)
                    .send(" erreur lors de l'insertion cinema")
                    throw err
                })
            } else {
                joinObject.cinema_idCinema = results.insertId

                
                connection.query('SELECT * FROM realisateurs', formDataReal, (err, results) => {
                    
                    const real = results.filter(result => result.name == formDataReal.name)

                    if (real.length !== 0) {
                        joinObject.realisateurs_idRealisateur = real.idRealisateur

                    } else {
                        connection.query('INSERT INTO realisateurs SET ?', formDataReal, (err, results) => {
                            if (err) {
                                return connection.rollback(_ => {
                                    res
                                    .status(500)
                                    .send(" error insert realisateur")
                                    throw err
                                })
                            }
                        })
                        }
                        
                        connection.query('SELECT * FROM distributeurEditeur', formDataEdit, (err, results) => {
                                
                                const edit = results.filter(result => result.name == formDataEdit.name)
                                
                                if (edit.length !== 0) {
                                    joinObject.distributeurEditeur_idDistributeurEditeur = edit.distributeurEditeur
                                    
                                } else {
                                    connection.query('INSERT INTO distributeurEditeur SET ?', formDataEdit, (err, results) => {
                                        if (err) {
                                            return connection.rollback(_ => {
                                            res
                                            .status(500)
                                            .send(" error insert distributeur")
                                        throw err
                                        })
                                    }
                                })
                            }
                        })
                     
                    
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(_ => {
                                res
                                .status(500)
                                .send(" error end rollback")
                                throw err
                            })
                        }
                    })
                    res.status(200).json({ results: "send" })
                })
            }    
        })
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