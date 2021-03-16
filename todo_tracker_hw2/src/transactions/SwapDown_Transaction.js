// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class SwapDown_Transaction extends jsTPS_Transaction {
    constructor(swapDown, newItem, undoRender) {
        super();
        this.swapDown = swapDown
        this.newItem = newItem
        this.undoRender = undoRender
    }

    doTransaction() {
        this.oldValue = this.swapDown(this.newItem)
    }

    undoTransaction() {
        this.undoRender(this.oldValue)
    }
}