const express = require('express')
const connection = require('../conf')

const router = express.Router()

router.get('/event', (req, res) => {
  connection.query('SELECT * FROM event', (err, results) => {
    if(err)
      res.status(500).send('Erreur lors de la recupération')
    else
      res.json(results)
  })
})

router.post('/event', (req, res) => {
  const formData = req.body
  connection.query('INSERT INTO event SET ?', formData, err => {
    if (err)
      res.status(500).send('Erreur lors de l\'enregistrement')
    else
      res.sendStatus(200)
  })
})

router.put('/event/:id', (req, res) => {
  const idevent = req.params.id
  const formData = req.body
  connection.query('UPDATE event SET ? WHERE idevent = ?', [formData, idevent], err => {
    if (err)
      res.status(500).send('Erreur lors de la modification')
    else
      res.sendStatus(200)
  })
})

router.delete('/event/:id', (req, res) => {
  const idevent = req.params.id
  connection.query('DELETE FROM event WHERE idevent = ?', idevent, err => {
    if (err)
      res.status(500).send('Erreur lors de la suppression')
    else
      res.sendStatus(200)
  })
})



module.exports = router
