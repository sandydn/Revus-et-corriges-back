const express = require('express')
const connection = require('../conf')

const router = express.Router()


router.get('/contactvideo', (req, res) => {
  connection.query('SELECT * FROM contact_has_video', (err, results) => {
    if (err)
      res.status(500).send('Erreur lors de la récupération')
    else
      res.json(results)
  })
})

router.post('/contactvideo', (req, res) => {
  const formData = req.body
  connection.query('INSERT INTO contact_has_video SET ?', formData, err => {
    if (err)
      res.status(500).send('Erreur lors de la modification')
    else
      res.sendStatus(200)
  })
})


module.exports = router
