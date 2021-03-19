// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
        this.state = {
            name: this.props.toDoList.name,
            edit: false
        }
    }
    timer = 0;

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    handleEditList = () => {
        this.setState({
            edit: false
        })
        this.props.editListCallback({"id": this.props.toDoList.id, 
                                     "name": this.state.name,
                                     "items": this.props.toDoList.items});
    }

    onSingleClickHandler = () => {
        this.timer = setTimeout(() => {
            if (!this.state.edit) {
                this.handleLoadList();
            }
        }, 200)
    }

    onDoubleClickHandler = () => {
        clearTimeout(this.timer);
        this.setState({edit: true})
    }
    
    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");
        
        return (
            this.state.edit ? 
                <input className='todo-list-button' type='text' 
                        value={this.state.name} 
                        onChange={(event) => this.setState({name: event.target.value})} 
                        onBlur={this.handleEditList} autoFocus>
                </input> :
                <div className='todo-list-button'
                     style={{color: this.props.first ? "#ffc819" : ""}}
                     onClick={this.onSingleClickHandler}
                     onDoubleClick={this.onDoubleClickHandler}>
                {this.props.toDoList.name}
            </div>
        )
    }
}

export default ListLink;