const express = require('express');
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log('Server Started on port ' + port + '!!!');
});

// Home route
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

// Post route
app.post('/', (req, res) => {
  let item = req.body.newItem;

  items.push(item);

  res.redirect('/');
});

// Initial list of items
let items = [];
