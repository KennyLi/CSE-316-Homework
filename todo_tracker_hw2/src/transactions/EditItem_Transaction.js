// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class EditItem_Transaction extends jsTPS_Transaction {
    constructor(editItem, newItem, undoRender) {
        super();
        this.editItem = editItem
        this.newItem = newItem
        this.undoRender = undoRender
    }

    doTransaction() {
        this.oldValue = this.editItem(this.newItem)
    }

    undoTransaction() {
        this.undoRender(this.oldValue)
    }
}