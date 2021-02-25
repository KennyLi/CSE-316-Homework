'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR EDITING A TASK
export default class DeleteItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, index) {
        super();
        this.model = initModel;
        this.index = index;
    }

    doTransaction() {
        this.removed = this.model.deleteItem(this.index);
    }

    undoTransaction() {
        this.model.restoreItem(this.index, this.removed);
    }
}