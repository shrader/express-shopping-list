const { json } = require("express");


class ItemManipulation {
    constructor() {
        this.items = [];
    }

    deleteAll() {
        this.items = [];
    }

    all() {
        return this.items;
    }
    get(searchName) {
        for (let obj of this.items){
            if (obj.name === searchName) return obj
        }
    
    }
    add(item) {
        this.items.push(item);
        return item
    }
    delete(searchName) {
        for (let obj of this.items){
            if (obj.name === searchName) {
                this.items.splice(this.items.indexOf(obj),1);
                return this.items
            }
        }
    }
    updateItem(searchName, newItem) {
        for (let obj of this.items){
            if (obj.name === searchName) {
                this.items[this.items.indexOf(obj)] = newItem;
                return newItem;
            }
     }
    }
}

module.exports = { ItemManipulation };