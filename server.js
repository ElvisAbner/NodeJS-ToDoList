const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const date = require('./date.js');

app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('public'));

//Items arrays
let items = [];
let workItems = [];

//Home route
app.get('/', (req, res) => {
  let day = date.getDate();

  res.render('list', {
    listTitle: day,
    newListItems: items
  });
});

//Post request to the home route
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

//About route
app.get('/about', (req, res) => {
  res.render('about');
});

//Port 
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
