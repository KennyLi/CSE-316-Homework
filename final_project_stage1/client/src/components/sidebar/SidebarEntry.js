import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import { WNavItem, WInput, WButton } from 'wt-frontend';
import { WRow, WCol }       from 'wt-frontend';

const SidebarEntry = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    const handleEditing = (e) => {
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;
        props.updateListField(props._id, name, value, preEdit);
    };

    const handleNavigate = () => {
        props.history.push("/spreadsheet/" + props._id)
    }

    return (
    <WRow className='table-entry'>
        <WCol size="10">
            <WNavItem 
                className='list-item'
            >
                {
                    editing ?   <WInput className="list-item-edit" inputClass="list-item-edit-input"
                                    onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}}
                                    name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} 
                                />
                            :
                                <div className="list-item" onClick={handleNavigate}>
                                    {props.name}
                                </div>
                }
            </WNavItem>
        </WCol>
        <WCol size="1">
            <WButton onClick={handleEditing} wType="texted" hoverAnimation="text-primary">
                <i className="material-icons">edit</i>
            </WButton>
        </WCol>
        <WCol size="1">
            <WButton onClick={() => {props.setShowDelete(props._id)}} wType="texted" hoverAnimation="text-primary">
                    <i className="material-icons">delete</i>
            </WButton>
        </WCol>
    </WRow>
    );
};

export default SidebarEntry;