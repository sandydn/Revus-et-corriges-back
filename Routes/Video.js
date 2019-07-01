const express = require('express')
const connection = require('../conf')

const router = express.Router()


router.get('/video', (req, res) => {
  connection.query('SELECT * FROM video', (err, results) => {
    console.log(err);
    
    if (err)
      res.status(500).send('Erreur lors de la recuperation')
    else
      res.json(results)
  })
})


router.post('/video', (req, res) => {
  const formData = req.body
  connection.query('INSERT INTO video SET ?', formData, err => {
    if (err)
      res.status(500).send('Erreur lors de l\'enregistrement')
    else
      res.sendStatus(200)
  })
})

router.put('/video/:id', (req, res) => {
  const idvideo = req.params.id
  const formData = req.body
  connection.query('UPDATE video SET ? WHERE idvideo = ?', [formData, idvideo], err => {
    if (err)
      res.status(500).send('Erreur lors de la modification')
    else
      res.sendStatus(200)
  })
})

router.delete('/video/:id', (req, res) => {
  const idvideo = req.params.id
  connection.query('DELETE FROM video WHERE idvideo = ?', idvideo, err => {
    if (err)
      res.status(500).send('Erreur lors de la supression')
    else
      res.sendStatus(200)
  })
})
module.exports = router
