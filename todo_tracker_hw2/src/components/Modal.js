// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    handleDeleteList = () => {
        this.props.deleteListCallback();
        this.props.toggleShowCallback();        
    }

    handleToggleShow = () => {
        this.props.toggleShowCallback();
    }
    render() {
        return (
            <div className="modal-overlay" style={{display: this.props.show ? "block" : ""}}>
                <div className="modal">
                    <div className="modal-header">Delete List?</div>
                    <div className="modal-body">
                        <div id="confirm" className="todo-button" onClick={this.handleDeleteList}>Confirm</div>
                        <div id="cancel" className="todo-button" onClick={this.handleToggleShow}>Cancel</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;