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
                        <Undo id="undo-button" onClick={this.handleUndo} className="list-item-control material-icons todo-button" />
                        <Redo id="redo-button" onClick={this.handleRedo} className="list-item-control material-icons todo-button" />
                        <AddBox id="add-item-button" onClick={this.handleAddNewListItem} className="list-item-control material-icons todo-button" />
                        <Delete id="delete-list-button" onClick={this.handleDeleteList} className="list-item-control material-icons todo-button" />
                        <Close id="close-list-button" onClick={this.handleCloseList} className="list-item-control material-icons todo-button" />
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
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