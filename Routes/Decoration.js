const express = require('express')
const connection = require('../conf')

const router = express.Router()

router.get('/decoration', (req, res) => {
  connection.query('SELECT * FROM decoration', (err, results) => {
    if (err)
      res.status(500).send('Erreur lors de la recuperation')
    else
      res.json(results)
  })
})

router.post('/decoration', (req, res) => {
  const formData = req.body
  connection.query('INSERT INTO decoration SET ?', formData, err => {
    if (err)
      res.status(500).send('Erreur lors de l\'enregistrement')
    else
      res.sendStatus(200)
  })
})

router.put('/decoration/:id', (req, res) => {
  const iddecoration = req.params.id
  const formData = req.body
  connection.query('UPDATE decoration SET ? WHERE iddecoration = ?', [formData, iddecoration], err => {
    if (err)
      res.status(500).send('Erreur lors de la modification')
    else
      res.sendStatus(200)
  })
})

router.delete('/decoration/:id', (req, res) => {
  const iddecoration = req.params.id
  connection.query('DELETE FROM decoration WHERE iddecoration = ?', iddecoration, err => {
    if (err)
      res.status(500).send('Erreur lors de la suppression')
    else
      res.sendStatus(200)
  })
})


module.exports = router
