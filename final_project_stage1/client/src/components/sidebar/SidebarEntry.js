import React, { useState }  from 'react';
import Delete 							from '../modals/Delete';
import { WNavItem, WInput, WButton } from 'wt-frontend';
import { WRow, WCol }       from 'wt-frontend';

const SidebarEntry = (props) => {
    const [showDelete, toggleShowDelete] 	= useState(false);
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

    const setShowDelete = () => {
		toggleShowDelete(!showDelete)
	};

    // const entryStyle = props._id === props.activeid ? 'list-item-active' : 'list-item ';
    
    return (
    <>
	{
		showDelete && (<Delete deleteList={props.deleteList} activeid={props._id} setShowDelete={setShowDelete} />)
	}   
    <WRow className='table-entry'>
        <WCol size="10">
            <WNavItem 
                className='list-item'
                onClick={() => { props.handleSetActive(props._id) }} 
            >
                {
                    editing ?   <WInput className="list-item-edit" inputClass="list-item-edit-input"
                                    onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}}
                                    name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.name} 
                                />
                            :   <div className="list-item">
                                    {props.name}
                                </div>
                }
            </WNavItem>
        </WCol>
        <WCol size="1">
            <WButton onClick={handleEditing} wType="texted">
                <i className="material-icons">edit</i>
            </WButton>
        </WCol>
        <WCol size="1">
            <WButton onClick={setShowDelete} wType="texted">
                    <i className="material-icons">delete</i>
            </WButton>
        </WCol>
    </WRow>
    </>
    );
};

export default SidebarEntry;