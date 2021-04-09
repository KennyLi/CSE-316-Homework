import { printIntrospectionSchema } from 'graphql';
import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const TableHeader = (props) => {
 
    const buttonStyle = props.disabled ? 'table-header-button-disabled' : 'table-header-button';
    
    let undoStyle = props.undoable ? 'table-header-button' : 'undo-redo-disabled'
    undoStyle = props.disabled ? 'table-header-button-disabled' : undoStyle

    let redoStyle = props.redoable ? 'table-header-button' : 'undo-redo-disabled'
    redoStyle = props.disabled ? 'table-header-button-disabled' : redoStyle

    const clickDisabled = () => { };

    const handleDescSort = () => {
        props.sort("description")
    }

    const handleDateSort = () => {
        props.sort("due_date")
    }

    const handleStatusSort = () => {
        props.sort("completed")
    }

    const handleAssignedSort = () => {
        props.sort("assigned_to")
    }
    
    return (
        <WRow className="table-header">
            <WCol size="3">
                <WButton className='table-header-section' wType="texted" onClick={props.disabled ? clickDisabled : handleDescSort}>Task</WButton>
            </WCol>

            <WCol size="2">
                <WButton className='table-header-section' wType="texted" onClick={props.disabled ? clickDisabled : handleDateSort}>Due Date</WButton>
            </WCol>

            <WCol size="2">
                <WButton className='table-header-section' wType="texted" onClick={props.disabled ? clickDisabled : handleStatusSort}>Status</WButton>
            </WCol>

            <WCol size="2">
                <WButton className='table-header-section' wType="texted" onClick={props.disabled ? clickDisabled : handleAssignedSort}>Assigned To</WButton>
            </WCol>

            <WCol size="3">
                <div className="table-header-buttons">
                    <WButton onClick={props.disabled || !props.undoable ? clickDisabled: props.undo} wType="texted" clickAnimation={props.disabled || !props.undoable ? "" :"ripple-light"} className={`${undoStyle}`}>
                        <i className="material-icons">undo</i>
                    </WButton>
                    <WButton onClick={props.disabled || !props.redoable ? clickDisabled : props.redo} wType="texted" clickAnimation={props.disabled || !props.redoable ? "" :"ripple-light"} className={`${redoStyle}`}>
                        <i className="material-icons">redo</i>
                    </WButton>
                    <WButton onClick={props.disabled ? clickDisabled : props.addItem} wType="texted" className={`${buttonStyle}`}>
                        <i className="material-icons">add_box</i>
                    </WButton>
                    <WButton onClick={props.disabled ? clickDisabled : props.setShowDelete} wType="texted" className={`${buttonStyle}`}>
                        <i className="material-icons">delete_outline</i>
                    </WButton>
                    <WButton onClick={props.disabled ? clickDisabled : () => props.setActiveList({})} wType="texted" className={`${buttonStyle}`}>
                        <i className="material-icons">close</i>
                    </WButton>
                </div>
            </WCol>

        </WRow>
    );
};

export default TableHeader;