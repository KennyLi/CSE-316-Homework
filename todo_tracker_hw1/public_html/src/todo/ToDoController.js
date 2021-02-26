'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function() {
            if (appModel.currentList === null) {
                let list = appModel.addNewList();
                // let ele = document.getElementById("todo-list-" + list.id);
                // ele.dispatchEvent(new Event("mousedown"));                
            }
        }
        document.getElementById("undo-button").onmousedown = function() {
            if (appModel.currentList !== null && appModel.tps.hasTransactionToUndo()) {
                appModel.undo();
            }
        }
        document.getElementById("redo-button").onmousedown = function() {
            if (appModel.currentList !== null && appModel.tps.hasTransactionToRedo()) {
                appModel.redo();
            }
        }
        document.getElementById("delete-list-button").onmousedown = function() {
            if (appModel.currentList !== null) {
                let modalOverlay = document.createElement("div");
                modalOverlay.setAttribute("class", "modal-overlay");
                let modal = document.createElement("div");
                modal.setAttribute("class", "modal");
                let modalHeader = document.createElement("div");
                modalHeader.setAttribute("class", "modal-header");
                modalHeader.innerHTML = "Delete List?"
                let modalBody = document.createElement("div");
                modalBody.setAttribute("class", "modal-body");
                let confirm = document.createElement("div");
                confirm.setAttribute("id", "confirm");
                confirm.setAttribute("class", "todo_button");
                confirm.innerHTML = "Confirm";
                confirm.onclick = function() {
                    appModel.removeCurrentList();
                    modalOverlay.remove();
                }
                let cancel = document.createElement("div");
                cancel.setAttribute("id", "cancel");
                cancel.setAttribute("class", "todo_button");
                cancel.innerHTML = "Cancel";
                cancel.onclick = function() {
                    modalOverlay.remove();
                }
                modalBody.appendChild(confirm);
                modalBody.appendChild(cancel);
                modal.appendChild(modalHeader);
                modal.appendChild(modalBody);
                modalOverlay.appendChild(modal);
                let workspace = document.getElementById("workspace");
                workspace.appendChild(modalOverlay);
                modalOverlay.style.display = "block";
            }
        }
        document.getElementById("add-item-button").onmousedown = function() {
            if (appModel.currentList !== null) {
                appModel.addNewItemTransaction();
            }
        }

        document.getElementById("close-list-button").onmousedown = function() {
            if (appModel.currentList !== null) {
                appModel.clearCurrentList();
            }
        }

    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        if (this.model.currentList === null || this.model.currentList.id != listId) {
            this.model.loadList(listId);
        }
    }

    handleItems() {
        let model = this.model;
        let taskHandler = document.getElementsByClassName("task-col");
        let dateHandler = document.getElementsByClassName("due-date-col");
        let statusHandler = document.getElementsByClassName("status-col");
        let length = taskHandler.length;
        for (let i = 1; i < length; i++) {   
            let index = i - 1;
            taskHandler[i].onclick = function() {
                let before = this;
                let input = document.createElement("input");
                input.setAttribute("class", "task-col");
                input.setAttribute("type", "text");
                input.value = this.innerHTML;
                input.style.backgroundColor = "#40454e";
                input.style.color = "#e9edf0";                
                input.addEventListener("focusout", function() {
                    if (this.value != before.innerHTML) {
                        model.editItemTransaction(-1, index, this.value);
                    } else {
                        this.replaceWith(before);
                    }
                })
                this.replaceWith(input);
                input.focus();
            };
            dateHandler[i].onclick = function() {
                let before = this;
                let input = document.createElement("input");
                input.setAttribute("class", "due-date-col");
                input.setAttribute("type", "date");
                input.setAttribute("value", before);
                input.style.backgroundColor = "#40454e";
                input.style.color = "#e9edf0";                
                input.addEventListener("focusout", function() {
                    if (this.value != "") {
                        model.editItemTransaction(0, index, this.value);
                    } else {
                        this.replaceWith(before);
                    }
                })
                this.replaceWith(input);
                input.focus();
            }
            statusHandler[i].onclick = function() {
                let before = this;
                let input = document.createElement("select");
                input.setAttribute("class", "status-col");
                let complete = document.createElement("option");
                complete.setAttribute("value", "complete");        
                complete.innerHTML = "complete";
                let incomplete = document.createElement("option");
                incomplete.setAttribute("value", "incomplete");
                incomplete.innerHTML = "incomplete";
                input.style.backgroundColor = "#40454e";
                input.style.color = "#e9edf0";                
                if (this.innerHTML === "incomplete") {
                    incomplete.setAttribute("selected", "");
                }
                input.appendChild(complete);
                input.appendChild(incomplete);
                input.addEventListener("focusout", function() {
                    if (this.value != before.innerHTML) {
                        model.editItemTransaction(1, index, this.value);
                    } else {
                        this.replaceWith(before);
                    }
                })
                this.replaceWith(input);
                input.focus();
            }
        }
        let controlHandler = document.getElementsByClassName("list-item-control material-icons")
        length = controlHandler.length;
        for (let i = 3; i < length; i++) {     
            let index = Math.floor(i / 3) - 1;                 
            if (i % 3 == 0) {
                if (i != 3) {
                    controlHandler[i].onclick = function() {
                        model.moveItemTransaction(index);  
                    }
                }
            } else if (i % 3 == 1) {
                if (i != length - 2) {        
                    controlHandler[i].onclick = function() {
                        model.moveItemTransaction(index + 1);
                    }
                }
            } else {
                controlHandler[i].onclick = function() {
                    model.deleteItemTransaction(index);
                }
            }
        }        
    }
}