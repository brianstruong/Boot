const express = require('express');

const app = express();

class Item {
  constructor(id, price, type) {
    this.id = id;
    this.price = price;
    this.type = type;
  }
}

let items = [
  new Item(0, 10, 'shirt'),
  new Item(1, 15, 'pants')
];

app.get('/items', function(req, res) {
    res.send(JSON.stringify(items))
})

app.get('/item/:id', function(req, res) {
  res.send(JSON.stringify(items.find(item => item.id === parseInt(req.params['id']))))
})

app.listen(3000, function() {
  console.log('POC listening on port 3000!')
})