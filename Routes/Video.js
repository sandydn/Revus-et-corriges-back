const express = require("express")
const connection = require('../conf');

const router = express.Router()


router.get('/video', (req, res) => {
    connection.query('SELECT * FROM video', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de l\'élément');
        } else {
            res.json(results);
        }
    })
})

router.post('/video', (req, res) => {
    const formDataImp = req.body.importance;
    const formDataVideo = req.body.video;
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
                        .send("error")
                    throw err
                })
            } else {
                joinObject.importance_idImportance = results.insertId
            }
        })
        
        console.log(req.body);
        connection.query('INSERT INTO video SET ?', formDataVideo, (err, results) => {
            
            if (err) {
                return connection.rollback(_ => {
                    res
                    .status(500)
                    .send(" erreur lors de l'insertion video")
                    throw err
                })
            } else {
                console.log("try");
                joinObject.video_idVideo = results.insertId

                connection.query('SELECT * FROM realisateurs', formDataReal, (err, results) => {

                    const real = results.filter(result => result.name == formDataReal.name)

                    console.log(real.length)
                    if (real.length !== 0) {
                        joinObject.realisateurs_idRealisateurs = results

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
                    
                        connection.query('SELECT * FROM distributeurEditeur', formDataEdit, (err, results) => {

                            const edit = results.filter(result => result.name == formDataEdit.name)

                            console.log(edit.length)
                            if (edit.length !== 0) {
                                joinObject.distributeurEditeur_idDistributeurEditeur = results

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

                    }
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
            /*              connection.end()
             */
        })
    })
})

router.put('/video/:id', (req, res) => {
    const idCalendar = req.params.id;
    const formData = req.body;
    connection.query('UPDATE video SET ? WHERE idVideo = ?', [formData, idCalendar], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification de l\'élément");
        } else {
            res.sendStatus(200);
        }
    });
});

router.delete('/video/:id', (req, res) => {
    const idCalendar = req.params.id;
    connection.query('DELETE FROM video WHERE idVideo = ?', [idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la suppression de l\'élément");
        } else {
            res.sendStatus(200);
        }p
    })
})

module.exports = router