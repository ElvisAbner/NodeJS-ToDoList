const express = require("express");
const mongoose = require ("mongoose")
const _ = require('lodash')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://admin-elvis:100billionx@cluster0.zocew6p.mongodb.net/?retryWrites=true&w=majority');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

app.all('*', (req,res) => {
  res.json({"every thing":"is awesome"})
})

connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests");
  })
})

const date = require(__dirname + "/date.js");

app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public"));


const itemsSchema = new mongoose.Schema ({
  name: {type: String, require: true, min: 1}
})

const Item = mongoose.model('Item', itemsSchema)

const defaultItemOne = new Item ({
  name: 'Welcome to your todolist!'
});

const defaultItemTwo = new Item ({
  name: 'Hit the + button to add a new item.'
});

const defaultItemThree = new Item ({
  name: '<-- Hit this to delete an item.'
});

const defaultItems = [defaultItemOne, defaultItemTwo, defaultItemThree];

//HOME ROUTE

app.get("/", function(req, res) {

  Item.find({}).then((foundItems) => {

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems).then(() => {
      console.log('Items successfully added to the database');
      })
      .catch((err) => {
      console.log(err);
      });
      res.redirect('/');
    } 
      const day = date.getDate();
      res.render("list", {listTitle: day, newListItems: foundItems});
      })
      .catch((err) => {
      console.log(err)
      })
    
  });

  const listSchema = new mongoose.Schema({
    name: {type: String},
    items: [itemsSchema]
  })

  const List = mongoose.model('List', listSchema)

  app.get('/:customListName', (req, res) => {
    const customListName = _.capitalize(req.params.customListName);
  
    List.findOne({ name: customListName })
      .then((foundList) => {
        if (foundList) {
          console.log('Exists');
          res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
        } else {
          const list = new List({
            name: customListName,
            items: defaultItems
          });
  
          list.save().then(() => {
            console.log('List saved.');
            res.redirect(`/${customListName}`); // Redirect to the custom list route
          });
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        res.status(500).send("Internal Server Error");
      });
  });
  
  

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item ({
    name: itemName
  });

  if (listName === date.getDate()) {
    item.save();
    res.redirect('/');
  } else {
    List.findOne({name: listName})
    .then((foundList) => {
      foundList.items.push(item);
      foundList.save();
      res.redirect('/' + listName)

    })
    .catch((err) => {
      console.log(err)
    })
  }
});

app.post('/delete', (req, res) => {

const checkedItemId = req.body.checkbox;
const listName = req.body.listName;


if (listName === date.getDate()) {

  Item.findByIdAndRemove(checkedItemId).then(() => {
    console.log('Item deleted')
  })
    .catch((err) => {
      console.log(err)
    })
  res.redirect('/');
} 

else {
  List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}})
  .then((foundList) => {
    res.redirect('/' + listName);
  })
  .catch((err) => {
    console.log(err)
  })
}
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

