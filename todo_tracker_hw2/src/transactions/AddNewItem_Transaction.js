// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewItem_Transaction extends jsTPS_Transaction {
    constructor(addListItem, undoAddItemRender) {
        super();
        this.addListItem = addListItem
        this.undoAddItemRender = undoAddItemRender
    }

    doTransaction() {
        this.oldValue = this.addListItem()
    }

    undoTransaction() {
        this.undoAddItemRender(this.oldValue)
    }
}