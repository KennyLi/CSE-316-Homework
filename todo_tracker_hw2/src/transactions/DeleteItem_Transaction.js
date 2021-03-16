// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class DeleteItem_Transaction extends jsTPS_Transaction {
    constructor(deleteItem, item, undoRender) {
        super();
        this.deleteItem = deleteItem
        this.item = item
        this.undoRender = undoRender
    }

    doTransaction() {
        this.oldValue = this.deleteItem(this.item)
    }

    undoTransaction() {
        this.undoRender(this.oldValue)
    }
}