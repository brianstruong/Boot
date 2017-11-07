const Item = require('./item')
const CATEGORIES = require('./categories')

//"database"
const data = [
  new Item(0, 'shirt A', 10, CATEGORIES.SHIRT),
  new Item(1, 'pants A', 15, CATEGORIES.PANTS)
];

 module.exports = class ItemDB {
  createItem({name, price, category}) {
    let item = new Item(null, name, price, category)

    for (var i = 0; i < data.length; i++) {
      if (data[i] === null) {
        item.id = i
        data[i] = item
        break
      }
    }

    if (i === data.length) {
      item.id = i
      data.push(item)
    }

    return item.name
  }

  updateItem({id, name, price, category}) {
    if (data[id]) {
      data[id].name = name
      data[id].price = price
      data[id].category = category
      return data[id]
    } else {
      return -1
    }
  }

  getItem(id) {
    let item = data.find((item) => {
      if (item) { return item.id === id }
      else { return false }
    })

    return item ? item : -1
  }

  getAllItems() {
    return data
  }

  deleteItem(id) {
    if (id >= 0 && id < data.length) {
      data[id] = null;
      return true
    } else {
      return false
    }
  }

  searchItem(name) {
    return data.find((item) => {
      return item.name === name
    })
  }
}