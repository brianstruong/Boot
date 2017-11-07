const app = require('express')()
const upload = require('multer')() //middleware for parsing form-data

const ItemDB = require('./item-db')
const db = new ItemDB()

app.route('/items')
  .get((req, res) => {
    //GET /items/?name=TERM
    if (req.query.name) {
      let result = db.searchItem(req.query.name)
      result ? res.json(result) : res.sendStatus(404)
    //GET /items 
    } else {
      res.json(db.getAllItems())
    }
  })
  //create item
  .post(upload.array(), (req, res) => {
    //item's name
    let result = db.createItem(req.body)

    result ? res.json(result) : res.sendStatus(404)
  })
  //update item
  .put(upload.array(), (req, res) => {
    let item = db.updateItem(req.body)

    item !== -1 ? res.sendStatus(200) : res.sendStatus(404)
  })

app.route('/items/:id')
  .get((req, res) => {
    let item = db.getItem(parseInt(req.params['id']))

    item !== -1 ? res.json(item) : res.sendStatus(404)
  })
  .delete((req, res) => {
    let result = db.deleteItem(req.params['id'])

    result ? res.sendStatus(200) : res.sendStatus(404)
  })

app.listen(3000, function() {
  console.log('POC listening on port 3000!')
})