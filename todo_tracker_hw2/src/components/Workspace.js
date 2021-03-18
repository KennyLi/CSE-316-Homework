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

    handleCloseList = () => {
        this.props.closeListCallback();
    }

    handleUndo = () => {
        this.props.undoCallback();
    }

    handleRedo = () => {
        this.props.redoCallback();
    }

    handleToggleShow = () => {
        this.props.toggleShowCallback();
    }

    render() {
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col">Task</div>
                    <div id="date-col-header" className="item-col">Due Date</div>
                    <div id="status-col-header" className="item-col">Status</div>
                    <div className="item-col"></div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" 
                              className="list-item-control material-icons todo-button"
                              onClick={this.props.undoable ? this.handleUndo : null}
                              style={{color: this.props.undoable ? "" : "#322d2d", 
                                      cursor: this.props.undoable ? "" : "text",
                                      pointerEvents: this.props.undoable ? "" : "none"}}/>
                        <Redo id="redo-button" 
                              className="list-item-control material-icons todo-button"
                              onClick={this.props.redoable ? this.handleRedo : null}
                              style={{color: this.props.redoable ? "" : "#322d2d", 
                                      cursor: this.props.redoable ? "" : "text",
                                      pointerEvents: this.props.redoable ? "" : "none"}}/>
                        <AddBox id="add-item-button"
                                className="list-item-control material-icons todo-button"
                                onClick={this.props.currentListId === undefined ? null : this.handleAddNewListItem}
                                style={{color: this.props.currentListId === undefined ? "#322d2d" : "", 
                                        cursor: this.props.currentListId === undefined ? "text" : "",
                                        pointerEvents: this.props.currentListId === undefined ? "none" : ""}}/>
                        <Delete id="delete-list-button" 
                                className="list-item-control material-icons todo-button"
                                onClick={this.props.currentListId === undefined ? null : this.handleToggleShow}
                                style={{color: this.props.currentListId === undefined ? "#322d2d" : "", 
                                        cursor: this.props.currentListId === undefined ? "text" : "",
                                        pointerEvents: this.props.currentListId === undefined ? "none" : ""}}/>
                        <Close id="close-list-button" 
                               className="list-item-control material-icons todo-button"
                               onClick={this.props.currentListId === undefined ? null : this.handleCloseList}    
                               style={{color: this.props.currentListId === undefined ? "#322d2d" : "", 
                               cursor: this.props.currentListId === undefined ? "text" : "",
                               pointerEvents: this.props.currentListId === undefined ? "none" : ""}}/>                        
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