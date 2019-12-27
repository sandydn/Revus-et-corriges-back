const express = require('express')
const connection = require('../conf')

const router = express.Router()

router.get('/contact', (req, res) => {
  connection.query('SELECT * FROM contact', (err, results) => {
    if (err)
      res.status(500).send('Erreur lors de la recuperation')
    else
      res.json(results)
  })
})

router.post('/contact', (req, res) => {
  const formData = req.body
  connection.query('INSERT INTO contact SET ?', formData, err => {
    if (err)
      res.status(500).send('Erreur lors de l\'enregistrement')
    else
      res.sendStatus(200)
  })
})

router.put('/contact/:id', (req, res) => {
  const idcontact = req.params.id
  const formData = req.body
  connection.query('UPDATE contact SET ? WHERE idcontact = ?', [formData, idcontact], err => {
    if (err)
      res.status(500).send('Erreur lors de la modification')
    else
      res.sendStatus(200)
  })
})

router.delete('/contact/:id', (req, res) => {
  const idcontact = req.params.id
  connection.query('DELETE FROM contact WHERE idcontact = ?', idcontact, err => {
    if (err)
      res.status(500).send('Erreur lors de la suppression')
    else
      res.sendStatus(200)
  })
})


module.exports = router
