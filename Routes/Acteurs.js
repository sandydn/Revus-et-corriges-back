const express = require ("express")
const connection = require('../conf');

const router = express.Router()

router.get('/acteurs', (req, res) => {
    connection.query('SELECT * FROM acteurs', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des informations');
        } else {
            res.json (results);
        }
    })
})

router.post('/acteurs', function (req, res) {
    const formData = req.body;
    console.log(formData);
    
    connection.beginTransaction( function (err) {
        
        if(err) { throw err}
        connection.query('INSERT INTO acteurs SET ?', formData, function (err, results) {
            if (err) {
                return connection.rollback( function() {                    
                    throw err
                })
            } else {
                // connection.query
                res.sendStatus(200);
            }
            console.log('acteur', res);
            
            const join = {acteurs_idActeurs : results.insertId, cinema_idCinema : 1}             
            connection.query('INSERT INTO acteursHasCinema SET ?', join, function (err, results) {                
                if (err) {
                    return connection.rollback( function() {
                        throw err
                    })
                } else {
                    // connection.query
                    console.log('erreur1');
                    
                    // res.sendStatus(200);
                }
                // console.log('acteurCinema', results);
                // const cinema = results.insertId
        
                // connection.query('INSERT INTO cinema SET ?', cinema, function (err) {
                //     if (err) {
                //         return connection.rollback( function() {
                //             throw err
                //         })
                //     } else {
                //         console.log('hey salut toi');
                        
                //         // connection.query
                //         res.sendStatus(200);
                //     }
                // })
                connection.commit((err)=> {
                    if (err) {
                      return connection.rollback( function() {
                        throw err;
                      });
                    }
                }); 
                console.log('success!');
                connection.end();
            })
        }) 
    })
})
    
router.put('/acteurs/:id', (req, res) => {
    console.log(req.params)
    const idCalendar = req.params.id;
    const formData = req.body;
    connection.query('UPDATE acteurs SET ? WHERE idActeurs = ?', [formData, idCalendar], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification de l\'enregistrement");
        } else {
            res.sendStatus(200);
        }
    });
});

router.delete('/acteurs/:id', (req, res) => {
    console.log(req.params.id)
    const idCalendar = req.params.id;
    
    connection.query('DELETE FROM `acteurs` WHERE `idActeurs` = ?', [idCalendar],err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la suppression de l\'élément");
        } else {
            res.sendStatus(200);
        }
    })
})

module.exports = router