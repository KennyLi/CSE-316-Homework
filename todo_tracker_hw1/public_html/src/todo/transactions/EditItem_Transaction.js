'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR EDITING A TASK
export default class EditItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, number, index, data) {
        super();
        this.model = initModel;
        this.number = number;
        this.index = index;
        this.data = data;
    }

    doTransaction() {
        this.textRemoved = this.model.editItem(this.number, this.index, this.data);
    }

    undoTransaction() {
        this.model.editItem(this.number, this.index, this.textRemoved);
    }
}