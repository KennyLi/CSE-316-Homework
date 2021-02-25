'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR EDITING A TASK
export default class MoveItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, index) {
        super();
        this.model = initModel;
        this.index = index;
    }

    doTransaction() {
        this.model.moveItem(this.index);
    }

    undoTransaction() {
        this.model.moveItem(this.index);
    }
}