const express = require('express')
const connection = require('../conf')
const VerifyToken = require('../auth/VerifyToken');

const router = express.Router()

router.get('/admin', (req, res) => {
  connection.query('SELECT * FROM admin', (err, results) => {
    if (err)
      res.status(500).send('Erreur lors de la recuperation')
    else
      res.json(results)
  })
})

router.post('/admin', (req, res) => {
  const formData = req.body
  connection.query('INSERT INTO admin SET ?', formData, err => {
    if (err)
      res.status(500).send('Erreur lors de l\'enregistrement')
    else
      res.sendStatus(200)
  })
})

router.put('/admin/:id', (req, res) => {
  const idadmin = req.params.id
  const formData = req.body
  connection.query('UPDATE admin SET ? WHERE idadmin = ?', [formData, idadmin], err => {
    if (err)
      res.status(500).send('Erreur lors de la modification')
    else
      res.sendStatus(200)
  })
})

router.delete('/admin/:id', VerifyToken, (req, res) => {
  const idAdmin = req.params.id
  connection.query('DELETE FROM admin WHERE idadmin = ?', idAdmin, err => {
    if (err)
      res.status(500).send('Erreur lors de la suppression')
    else
      res.sendStatus(200)
  })
})

module.exports = router
