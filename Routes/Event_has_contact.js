const express = require('express')
const connection = require('../conf')

const router = express.Router()


router.get('/eventcontact', (req, res) => {
  connection.query('SELECT * FROM event_has_contact', (err, results) => {
    if (err)
      res.status(500).send('Erreur lors de la recuperation')
    else
      res.json(results)
  })
})

router.post('/eventcontact', (req, res) => {
  const formData = req.body
  connection.query('INSERT INTO event_has_contact SET ?', formData, err => {
    if (err)
      res.status(500).send('Erreur lors de l\'enregistrement')
    else
      req.sendStatus(200)
  })
})


module.exports = router
