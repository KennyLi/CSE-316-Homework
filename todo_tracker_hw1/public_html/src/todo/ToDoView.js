'use strict'

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.appendChild(document.createTextNode(newList.name));
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            thisController.handleLoadList(newList.id);
        }
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        let addListButton = document.getElementById("add-list-button");
        this.enableButton(addListButton);
        let deleteButton = document.getElementById("delete-list-button");
        this.disableButton(deleteButton, "#322d2d", "#353a44");
        let addItemButton = document.getElementById("add-item-button");
        this.disableButton(addItemButton, "#322d2d", "#353a44");
        let closeButton = document.getElementById("close-list-button");
        this.disableButton(closeButton, "#322d2d", "#353a44");        
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
        let highlight = document.getElementById("todo-lists-list").firstChild;
        highlight.style.color = "";        
        let undoButton = document.getElementById("undo-button");
        let redoButton = document.getElementById("redo-button");
        this.disableButton(undoButton, "#322d2d", "#353a44");
        this.disableButton(redoButton, "#322d2d", "#353a44");        
    }

    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();

        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];
            let listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"
                                + "<div class='task-col'>" + listItem.description + "</div>"
                                + "<div class='due-date-col'>" + listItem.dueDate + "</div>"
                                + "<div class='status-col'>" + listItem.status + "</div>"
                                + "<div class='list-controls-col'>"
                                + " <div class='list-item-control material-icons'>keyboard_arrow_up</div>"
                                + " <div class='list-item-control material-icons'>keyboard_arrow_down</div>"
                                + " <div class='list-item-control material-icons'>close</div>"
                                + " <div class='list-item-control'></div>"
                                + " <div class='list-item-control'></div>"
                                + "</div>";
            itemsListDiv.innerHTML += listItemElement;
        }
        this.styleViewList();
    }

    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
        this.setUpButtons();
    }

    disableButton(ele, color, bgcolor) {
        ele.style.cursor = "text";
        ele.style.color = color;
        ele.onmouseover = function() {
            ele.style.backgroundColor = bgcolor;
        }
    }

    enableButton(ele) {
        ele.style.cursor = "";
        ele.style.color = "";
        ele.onmouseover = function() {
            ele.style.backgroundColor = "";
        }        
    }

    setUpButtons() {
        let undoButton = document.getElementById("undo-button");
        this.disableButton(undoButton, "#322d2d", "#353a44");        
        let redoButton = document.getElementById("redo-button");
        this.disableButton(redoButton, "#322d2d", "#353a44");   
        let deleteButton = document.getElementById("delete-list-button");
        this.disableButton(deleteButton, "#322d2d", "#353a44");
        let addItemButton = document.getElementById("add-item-button");
        this.disableButton(addItemButton, "#322d2d", "#353a44");
        let closeButton = document.getElementById("close-list-button");
        this.disableButton(closeButton, "#322d2d", "#353a44"); 
    }

    styleViewList() {
        let statusHandler = document.getElementsByClassName("status-col");
        for (let i = 1; i < statusHandler.length; i++) {
            let status = statusHandler[i]
            if (status.innerHTML == "complete") {
                status.style.color = "#f5bc75";
            } else {
                status.style.color = "#8ed4f8";
            }
        }     
        let highlight = document.getElementById("todo-lists-list").firstChild;
        highlight.style.color = "#ffc819";
        this.controller.handleItems();
        let controlHandler = document.getElementsByClassName("list-item-control material-icons")
        if (controlHandler.length > 3) {
        this.disableButton(controlHandler[3], "#322d2d", "#40454e");
        this.disableButton(controlHandler[controlHandler.length - 2], "#322d2d", "#40454e");
        }
        let addListButton = document.getElementById("add-list-button");
        this.disableButton(addListButton, "#322d2d", "#353a44");
        let deleteButton = document.getElementById("delete-list-button");
        this.enableButton(deleteButton);
        let addItemButton = document.getElementById("add-item-button");
        this.enableButton(addItemButton);
        let closeButton = document.getElementById("close-list-button");
        this.enableButton(closeButton);        
    }
}