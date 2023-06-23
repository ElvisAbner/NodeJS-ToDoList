const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('Server Started on port 3000!!!');
});

app.get('/', (req, res) => {

  let today = new Date();

  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  let day = today.toLocaleDateString('en-US', options);

  res.render('list', {
    kindOfDay: day
  });
});