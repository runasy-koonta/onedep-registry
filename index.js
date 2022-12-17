const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 80;

const htpasswd = path.join(__dirname, 'auth', 'htpasswd');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/new', (req, res) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const username = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  const line = `${username}:${hash}\n`;

  fs.appendFileSync(htpasswd, line);

  return res.json({
    success: true,
    username,
  });
});

app.listen(port, () => {
  console.log(`Registry server listening on port ${port}`);
});
