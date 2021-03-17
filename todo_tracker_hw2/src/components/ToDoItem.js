// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
        this.state = {
            editDescription: false,
            editDueDate: false,
            editStatus: false,
            description: this.props.toDoListItem.description,
            due_date: this.props.toDoListItem.due_date,
            status: this.props.toDoListItem.status
        }
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    handleEditItem = () => {
        this.setState({
            editDescription: false,
            editDueDate: false,
            editStatus: false
        })
        this.props.editItemCallback({"id": this.props.toDoListItem.id, 
                                           "description":this.state.description, 
                                           "due_date": this.state.due_date, 
                                           "status": this.state.status});
    }

    handleMoveUpList = () => {
        this.props.swapUpListCallback(this.props.toDoListItem)
    }

    handleMoveDownList = () => {
        this.props.swapDownListCallback(this.props.toDoListItem)
    }

    handleDeleteItem = () => {
        this.props.deleteItemCallback(this.props.toDoListItem)
    }
    
    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                {this.state.editDescription ? 
                    <input className='item-col task-col' type='text' 
                        value={this.state.description} 
                        onChange={(event) => this.setState({description: event.target.value})} 
                        onBlur={this.handleEditItem} autoFocus>
                    </input> :
                    <div className='item-col task-col'
                        onClick={() => 
                            this.setState({editDescription: true, 
                                           description: listItem.description,
                                           due_date: listItem.due_date,
                                           status: listItem.status})}>
                        {listItem.description}
                    </div>}
                
                {this.state.editDueDate ?
                    <input className='item-col due-date-col' type='date'
                        value={this.state.due_date}
                        onChange={(event) => this.setState({due_date: event.target.value})}
                        onBlur={this.handleEditItem} autoFocus>
                    </input> :
                    <div className='item-col due-date-col'
                        onClick={() => 
                            this.setState({editDueDate: true, 
                                            description: listItem.description,
                                            due_date: listItem.due_date,
                                            status: listItem.status})}>
                        {listItem.due_date}
                    </div>}
                
                {this.state.editStatus ?
                    <select className='item-col status-col'
                        value={this.state.status}
                        onChange={(event) => this.setState({status: event.target.value})}
                        onBlur={this.handleEditItem} autoFocus>
                        <option value={"complete"}>complete</option>
                        <option value={"incomplete"}>incomplete</option>
                    </select> :
                <div className='item-col status-col' 
                    onClick={() => 
                            this.setState({editStatus: true, 
                                description: listItem.description,
                                due_date: listItem.due_date,
                                status: listItem.status})}
                    className={statusType}>
                    {listItem.status}
                </div>}
                
                <div className='item-col test-4-col'></div>
                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp 
                        className='list-item-control todo-button' 
                        onClick={this.props.first ? null : this.handleMoveUpList}
                        onMouseEnter={this.props.first ? (event) => event.target.style.backgroundColor = "#353a44" : (event) => event.target.style.backgroundColor = ""}
                        style={{color: this.props.first ? "#322d2d" : "", 
                                cursor: this.props.first ? "text" : ""}}/>
                    <KeyboardArrowDown 
                        className='list-item-control todo-button' 
                        onClick={this.props.last ? null : this.handleMoveDownList}
                        onMouseEnter={this.props.last ? (event) => event.target.style.backgroundColor = "#353a44" : (event) => event.target.style.backgroundColor = ""}
                        style={{color: this.props.last ? "#322d2d" : "", 
                                cursor: this.props.last ? "text" : ""}}/>   
                    <Close className='list-item-control todo-button' onClick={this.handleDeleteItem}/>
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;