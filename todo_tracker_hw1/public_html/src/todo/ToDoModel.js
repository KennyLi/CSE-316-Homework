'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import EditItem_Transaction from './transactions/EditItem_Transaction.js'
import MoveItem_Transaction from './transactions/MoveItem_Transaction.js'
import DeleteItem_Transaction from './transactions/DeleteItem_Transaction.js'

/**
 * ToDoModel
 * 
 * This class manages all the app data.
 */
export default class ToDoModel {
    constructor() {
        // THIS WILL STORE ALL OF OUR LISTS
        this.toDoLists = [];

        // THIS IS THE LIST CURRENTLY BEING EDITED
        this.currentList = null;

        // THIS WILL MANAGE OUR TRANSACTIONS
        this.tps = new jsTPS();

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
        this.nextListId = 0;

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
        this.nextListItemId = 0;
    }

    /**
     * addItemToCurrentList
     * 
     * This function adds the itemToAdd argument to the current list being edited.
     * 
     * @param {*} itemToAdd A instantiated item to add to the list.
     */
    addItemToCurrentList(itemToAdd) {
        this.currentList.push(itemToAdd);
    }

    /**
     * addNewItemToCurrentList
     * 
     * This function adds a brand new default item to the current list.
     */
    addNewItemToCurrentList() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.addItemToList(this.currentList, newItem);
        return newItem;
    }

    /**
     * addItemToList
     * 
     * Function for adding a new item to the list argument using the provided data arguments.
     */
    addNewItemToList(list, initDescription, initDueDate, initStatus) {
        let newItem = new ToDoListItem(this.nextListItemId++);
        newItem.setDescription(initDescription);
        newItem.setDueDate(initDueDate);
        newItem.setStatus(initStatus);
        list.addItem(newItem);
        if (this.currentList) {
            this.view.refreshList(list);
        }
    }

    /**
     * addNewItemTransaction
     * 
     * Creates a new transaction for adding an item and adds it to the transaction stack.
     */
    addNewItemTransaction() {
        let transaction = new AddNewItem_Transaction(this);
        this.tps.addTransaction(transaction);
        let undoButton = document.getElementById("undo-button");
        this.view.enableButton(undoButton);
        let redoButton = document.getElementById("redo-button");
        this.view.disableButton(redoButton, "#322d2d", "#353a44");        
    }

    /**
     * addNewList
     * 
     * This function makes a new list and adds it to the application. The list will
     * have initName as its name.
     * 
     * @param {*} initName The name of this to add.
     */
    addNewList(initName) {
        let newList = new ToDoList(this.nextListId++);
        if (initName)
            newList.setName(initName);
        this.toDoLists.push(newList);
        this.view.appendNewListToView(newList);
        return newList;
    }

    /**
     * Adds a brand new default item to the current list's items list and refreshes the view.
     */
    addNewItem() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.currentList.items.push(newItem);
        this.view.viewList(this.currentList);
        return newItem;
    }

    /**
     * Makes a new list item with the provided data and adds it to the list.
     */
    loadItemIntoList(list, description, due_date, assigned_to, completed) {
        let newItem = new ToDoListItem();
        newItem.setDescription(description);
        newItem.setDueDate(due_date);
        newItem.setAssignedTo(assigned_to);
        newItem.setCompleted(completed);
        this.addItemToList(list, newItem);
    }

    /**
     * Load the items for the listId list into the UI.
     */
    loadList(listId) {
        let found = false;
        for (let i = 0; (i < this.toDoLists.length && !found); i++) {
            let list = this.toDoLists[i];
            if (list.id === listId) {
                this.toDoLists.splice(i, 1);
                this.toDoLists.unshift(list);
                this.view.refreshLists(this.toDoLists);                
                found = true;
            }
        }
        if (found) {
            this.tps.clearAllTransactions();
            let listToLoad = this.toDoLists[0];
            this.currentList = listToLoad;
            this.view.viewList(this.currentList);
        }
    }

    /**
     * Redo the current transaction if there is one.
     */
    redo() {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
            let undoButton = document.getElementById("undo-button");
            this.view.enableButton(undoButton);            
            if (!this.tps.hasTransactionToRedo()) {
                let redoButton = document.getElementById("redo-button");
                this.view.disableButton(redoButton, "#322d2d", "#353a44");                
            }            
        }
    }   

    /**
     * Remove the itemToRemove from the current list and refresh.
     */
    removeItem(itemToRemove) {
        this.currentList.removeItem(itemToRemove);
        this.view.viewList(this.currentList);
    }

    /**
     * Finds and then removes the current list.
     */
    removeCurrentList() {
        let indexOfList = -1;
        for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
            if (this.toDoLists[i].id === this.currentList.id) {
                indexOfList = i;
            }
        }
        this.tps.clearAllTransactions();        
        this.toDoLists.splice(indexOfList, 1);
        this.currentList = null;
        this.view.clearItemsList();
        this.view.refreshLists(this.toDoLists);
    }

    // WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
    setView(initView) {
        this.view = initView;
    }

    /**
     * Undo the most recently done transaction if there is one.
     */
    undo() {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
            let redoButton = document.getElementById("redo-button");
            this.view.enableButton(redoButton);            
            if (!this.tps.hasTransactionToUndo()) {
                let undoButton = document.getElementById("undo-button");
                this.view.disableButton(undoButton, "#322d2d", "#353a44");               
            }
        }
    }

    clearCurrentList() {
        this.tps.clearAllTransactions();        
        this.currentList = null;
        this.view.clearItemsList();
        this.view.refreshLists(this.toDoLists);                
    }

    editItemTransaction(number, index, data) {
        let transaction = new EditItem_Transaction(this, number, index, data);
        this.tps.addTransaction(transaction);
        let undoButton = document.getElementById("undo-button");
        this.view.enableButton(undoButton);
        let redoButton = document.getElementById("redo-button");
        this.view.disableButton(redoButton, "#322d2d", "#353a44");        
    }

    editItem(number, index, data) {
        let temp;
        if (number < 0) {
            temp = this.currentList.items[index].getDescription();
            this.currentList.items[index].setDescription(data);
        } else if (number == 0) {
            temp = this.currentList.items[index].getDueDate();
            this.currentList.items[index].setDueDate(data);            
        } else {
            temp = this.currentList.items[index].getStatus();
            this.currentList.items[index].setStatus(data);             
        }
        this.view.viewList(this.currentList);
        return temp;
    }    

    moveItemTransaction(index) {
        let transaction = new MoveItem_Transaction(this, index);
        this.tps.addTransaction(transaction);
        let undoButton = document.getElementById("undo-button");
        this.view.enableButton(undoButton);
        let redoButton = document.getElementById("redo-button");
        this.view.disableButton(redoButton, "#322d2d", "#353a44");        
    }

    moveItem(index) {
        let i = this.currentList.items[index];
        let j = this.currentList.items[index - 1];
        this.currentList.items[index - 1] = i;
        this.currentList.items[index] = j;  
        this.view.viewList(this.currentList);       
    }

    deleteItemTransaction(index) {
        let transaction = new DeleteItem_Transaction(this, index);
        this.tps.addTransaction(transaction);
        let undoButton = document.getElementById("undo-button");
        this.view.enableButton(undoButton);
        let redoButton = document.getElementById("redo-button");
        this.view.disableButton(redoButton, "#322d2d", "#353a44");                
    }

    deleteItem(index) {
        let item = this.currentList.items[index];
        this.removeItem(item);
        return item;
    }

    restoreItem(index, item) {
        this.currentList.items.splice(index, 0, item);
        this.view.viewList(this.currentList); 
    }
}