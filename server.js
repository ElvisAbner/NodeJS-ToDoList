const express = require('express');
const app = express();

let items = [];

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

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
    kindOfDay: day,
    newListItem: items
  });
});

app.post('/', (req, res) => {
  let item = req.body.newItem;

  items.push(item);

  res.redirect('/');
});
