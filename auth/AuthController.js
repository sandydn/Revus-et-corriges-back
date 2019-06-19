const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../conf');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');
const VerifyToken = require('./VerifyToken');


// Register a new user//
router.post('/register', (req, res) => {

  //Paswword crypting
  const hashedPassword = bcrypt.hashSync(req.body.admin_password, 8);

  const values = [req.body.admin_email, hashedPassword, req.body.name]
  connection.query('INSERT INTO admin (admin_email, admin_password,name) VALUES (?,?,?)', values, (err, user) => {
    console.log(req.body)
    if (err) return res.status(500).send("There was a problem registering the user.")
    // create a token
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
});

// Login user //
router.post('/login', (req, res) => {

  const values = [req.body.admin_email]

  connection.query('SELECT * from admin WHERE admin_email = ?', values, (err, user) => {
    if (err)
      return res.status(500).send('Error on the server.');
    if (!user[0])
      return res.status(404).send('No user found.');

    // Verify the password is valid
    const passwordIsValid = bcrypt.compareSync(req.body.admin_password, user[0].admin_password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ idAdmin: user[0]._idAdmin }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
});

// Verify Token //
router.get('/verify', VerifyToken, (req, res, next) => {

  const sql = "SELECT * FROM admin WHERE idAdmin = ?"
  const values = [req.body.idAdmin]

  connection.query(sql, values, (err, user) => {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user[0])
      return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
});

// Logout user //
router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null });
});


module.exports = router