const express = require('express')
const connection = require('../conf')

const router = express.Router()


router.get('/videoevent', (req, res) => {
  connection.query('SELECT * FROM video_has_event', (err, results) => {
    if (err)
      res.status(500).send('Erreur lors de la recuperation')
    else
      res.json(results)
  })
})

router.post('/videoevent', (req, res) => {
  const formData = req.body
  connection.query('INSERT INTO video_has_event SET ?', formData, err => {
    console.log(err);

    if (err)
      res.status(500).send('Erreur lors de l\'ajout')
    else
      res.sendStatus(200)
  })
})


module.exports = router
