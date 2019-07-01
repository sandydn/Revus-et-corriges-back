const express = require('express')
const connection = require('../conf')

const router = express.Router()

router.get('/lieux', (req, res) => {
  connection.query('SELECT * FROM lieux', (err, results) => {
    if (err)
      res.status(500).send('Erreur lors de la recuperation')
    else
      res.json(results)
  })
})

router.post('/lieux', (req, res) => {
  const formData = req.body
  connection.query('INSERT INTO lieux SET ?', formData, err => {
    if (err)
      res.status(500).send('Erreur lors de l\'enregistrement')
    else
      res.sendStatus(200)
  })
})

router.put('/lieux/:id', (req, res) => {
  const idlieux = req.params.id
  const formData = req.body
  connection.query('UPDATE lieux SET ? WHERE idlieux = ?', [formData, idlieux], err => {
    if (err)
      res.status(500).send('Erreur lors de la modification')
    else
      res.sendStatus(200)
  })
})

router.delete('/lieux/:id', (req, res) => {
  const idlieux = req.params.id
  connection.query('DELETE FROM lieux WHERE idlieux = ?', idlieux, err => {
    if (err)
      res.status(500).send('Erreur lors de la suppression')
    else
      res.sendStatus(200)
  })
})


module.exports = router
