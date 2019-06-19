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
        console.log("here");
        
        connection.query('INSERT INTO importance SET ?', formDataImp, (err, results) => {
            if (err) {
                return connection.rollback(_ => {
                    res
                        .status(500)
                        .send("error")
                    throw err
                })
            } else {
                joinObject.importance_idImportance = results.insertId
            }
        })
        console.log("ici");
        
        connection.query('INSERT INTO cinema SET ?', formDataCinema, (err, results) => {
            console.log("hey");
            
            if (err) {

                return connection.rollback(_ => {
                    res
                        .status(500)
                        .send(" erreur lors de l'insertion cinema")
                    throw err
                })
            } else {
                
                joinObject.cinema_idCinema = results.insertId

                console.log("hi");
                
                connection.query('SELECT * FROM realisateurs', formDataReal, (err, results) => {

                    const real = results.filter(result => result.name == formDataReal.name)

                    console.log(real)
                    if (real.length !== 0) {
                        joinObject.realisateurs_idRealisateurs = real.idRealisateur

                        console.log("yolo");
                    } else {
                        connection.query('INSERT INTO realisateurs SET ?', formDataReal, (err, results) => {
                            if (err) {
                                return connection.rollback(_ => {
                                    res
                                    .status(500)
                                    .send(" error realisateur")
                                    throw err
                                })
                            }
                        })
                        }
                        
                        console.log('allo');
                        connection.query('SELECT * FROM distributeurEditeur', formDataEdit, (err, results) => {
                                
                                const edit = results.filter(result => result.name == formDataEdit.name)
                                
                                console.log(edit.length)
                                if (edit.length !== 0) {
                                    joinObject.distributeurEditeur_idDistributeurEditeur = edit.distributeurEditeur
                                    console.log(edit.distributeurEditeur);
                                    
                                } else {
                                    console.log("yes")
                                    connection.query('INSERT INTO distributeurEditeur SET ?', formDataEdit, (err, results) => {
                                        if (err) {
                                            return connection.rollback(_ => {
                                           
                                            res
                                                .status(500)
                                                .send(" error distrib")
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
                                    .send(" error 3")
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