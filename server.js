const express = require('express');
const app = express();
const port = 3000;
const date = require(__dirname + '/date.js')

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Parse URL-encoded bodies
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {

  let day = date.getDate();

  res.render('list', {
    listTitle: day,
    newListItems: items
  });
});

// Post route
app.post('/', (req, res) => {
  let item = req.body.newItem;

  if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }
});

//Work route
app.get('/work', (req, res) => {
  res.render('list', {
    listTitle: 'Work List',
    newListItems: workItems
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

// Initial list of items
let items = [];
let workItems = [];

// Start the server
app.listen(port, () => {
  console.log('Server Started on port ' + port + '!!!');
});