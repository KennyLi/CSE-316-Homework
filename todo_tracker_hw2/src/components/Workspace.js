// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }

    handleAddNewListItem = () => {
        this.props.addNewListItemCallback();
    }

    handleDeleteList = () => {
        this.props.deleteListCallback();
    }

    handleCloseList = () => {
        this.props.closeListCallback();
    }

    handleUndo = () => {
        this.props.undoCallback();
    }

    handleRedo = () => {
        this.props.redoCallback();
    }

    render() {
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" 
                              className="list-item-control material-icons todo-button"
                              onClick={this.props.undoable ? this.handleUndo : null}
                              onMouseEnter={this.props.undoable ? (event) => event.target.style.backgroundColor = "" : (event) => event.target.style.backgroundColor = "#353a44"}
                              style={{color: this.props.undoable ? "" : "#322d2d", 
                                      cursor: this.props.undoable ? "" : "text"}}/>
                        <Redo id="redo-button" 
                              className="list-item-control material-icons todo-button"
                              onClick={this.props.redoable ? this.handleRedo : null}
                              onMouseEnter={this.props.redoable ? (event) => event.target.style.backgroundColor = "" : (event) => event.target.style.backgroundColor = "#353a44"}
                              style={{color: this.props.redoable ? "" : "#322d2d", 
                                      cursor: this.props.redoable ? "" : "text"}}/>
                        <AddBox id="add-item-button"
                                className="list-item-control material-icons todo-button"
                                onClick={this.props.currentListId === undefined ? null : this.handleAddNewListItem}
                                onMouseEnter={this.props.currentListId === undefined ? (event) => event.target.style.backgroundColor = "#353a44" : (event) => event.target.style.backgroundColor = ""}
                                style={{color: this.props.currentListId === undefined ? "#322d2d" : "", 
                                        cursor: this.props.currentListId === undefined ? "text" : ""}}/>
                        <Delete id="delete-list-button" 
                                className="list-item-control material-icons todo-button"
                                onClick={this.props.currentListId === undefined ? null : this.handleDeleteList}
                                onMouseEnter={this.props.currentListId === undefined ? (event) => event.target.style.backgroundColor = "#353a44" : (event) => event.target.style.backgroundColor = ""}
                                style={{color: this.props.currentListId === undefined ? "#322d2d" : "", 
                                        cursor: this.props.currentListId === undefined ? "text" : ""}}/>
                        <Close id="close-list-button" 
                               className="list-item-control material-icons todo-button"
                               onClick={this.props.currentListId === undefined ? null : this.handleCloseList}
                               onMouseEnter={this.props.currentListId === undefined ? (event) => event.target.style.backgroundColor = "#353a44" : (event) => event.target.style.backgroundColor = ""}                               
                               style={{color: this.props.currentListId === undefined ? "#322d2d" : "", 
                               cursor: this.props.currentListId === undefined ? "text" : ""}}/>                               
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            first={this.props.firstItem.id === toDoListItem.id}
                            last={this.props.lastItem.id === toDoListItem.id}
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            editItemCallback={this.props.editItemCallback}
                            swapUpListCallback = {this.props.swapUpListCallback}
                            swapDownListCallback = {this.props.swapDownListCallback}
                            deleteItemCallback = {this.props.deleteItemCallback}
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;