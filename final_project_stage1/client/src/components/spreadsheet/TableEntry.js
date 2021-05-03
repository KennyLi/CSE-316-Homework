import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const TableEntry = (props) => {
    const { data } = props;

    // const completeStyle = data.completed ? ' complete-task' : ' incomplete-task';
    // const assignedToStyle = data.completed ? 'complete-task-assignedTo' : 'incomplete-task-assignedTo';

    const name = data.name;
    const capital = data.capital;
    const leader = data.leader;

    // const canMoveUp = props.index > 0 ? true : false;
    // const canMoveDown = props.index < props.entryCount-1 ? true : false;
    
    // const [editingDate, toggleDateEdit] = useState(false);
    // const [editingDescr, toggleDescrEdit] = useState(false);
    // const [editingStatus, toggleStatusEdit] = useState(false);
    // const [editingAssigned, toggleAssignEdit] = useState(false);

    const disabledButton = () => {}

    // const handleDateEdit = (e) => {
    //     toggleDateEdit(false);
    //     const newDate = e.target.value ? e.target.value : 'No Date';
    //     const prevDate = due_date;
    //     if(newDate !== prevDate) {
    //         props.editItem(data._id, 'due_date', newDate, prevDate);
    //     }

    // };

    // const handleDescrEdit = (e) => {
    //     toggleDescrEdit(false);
    //     const newDescr = e.target.value ? e.target.value : 'No Description';
    //     const prevDescr = description;
    //     if(newDescr !== prevDescr) {
    //         props.editItem(data._id, 'description', newDescr, prevDescr);
    //     }
    // };

    // const handleStatusEdit = (e) => {
    //     toggleStatusEdit(false);
    //     const newStatus = e.target.value ? e.target.value : false;
    //     const prevStatus = status;
    //     if(newStatus !== prevStatus) {
    //         props.editItem(data._id, 'completed', newStatus, prevStatus);
    //     }
    // };

    // const handleAssignEdit = (e) => {
    //     toggleAssignEdit(false);
    //     const newAssigned = e.target.value ? e.target.value : 'Myself';
    //     const prevAssigned = assigned_to;
    //     if(newAssigned !== prevAssigned) {
    //         props.editItem(data._id, 'assigned_to', newAssigned, prevAssigned);
    //     }
    // }

    const handleNavigateSubregion = () => {
        props.history.push(props.path + "/" + data._id)
    }
    
    const handleNavigateLandmark = () => {
        let path = props.path.replace("spreadsheet", "viewer")
        props.history.push(path + "/" + data._id)
    }

    return (
        <WRow className='table-entry'>
            <WCol size="3">
                <WRow>
                    <WCol size="10">
                        <div className="table-text" onClick={handleNavigateSubregion}>
                            {name}
                        </div>
                    </WCol>
                    <WCol size="1">
                        <WButton onClick={disabledButton} wType="texted" hoverAnimation="text-primary">
                            <i className="material-icons">edit</i>
                        </WButton>
                    </WCol>
                    <WCol size="1">
                        <WButton onClick={disabledButton} wType="texted" hoverAnimation="text-primary">
                            <i className="material-icons">delete</i>
                        </WButton>
                    </WCol>
                </WRow>
            </WCol>

            <WCol size="2">
                <div className="table-text" onClick={disabledButton}>
                    {capital}
                </div>
            </WCol>

            <WCol size="2">
                <div className="table-text" onClick={disabledButton}>
                    {leader}
                </div>
            </WCol>

            <WCol size="2">
                <div className="table-text" onClick={disabledButton}>
                    ???
                </div>
            </WCol>
            <WCol size="3">
                <div className="table-text" onClick={handleNavigateLandmark}>
                    ???
                </div>
            </WCol>
        </WRow>
    //     <WRow className='table-entry'>
    //     <WCol size="3">
    //         {
    //             editingDescr || description === ''
    //                 ? <WInput
    //                     className='table-input' onBlur={handleDescrEdit}
    //                     onKeyDown={(e) => {if(e.keyCode === 13) handleDescrEdit(e)}}
    //                     autoFocus={true} defaultValue={description} type='text'
    //                     inputClass="table-input-class"
    //                 />
    //                 : <div className="table-text"
    //                     onClick={() => toggleDescrEdit(!editingDescr)}
    //                 >{description}
    //                 </div>
    //         }
    //     </WCol>

    //     <WCol size="2">
    //         {
    //             editingDate ? <WInput
    //                 className='table-input' onBlur={handleDateEdit}
    //                 autoFocus={true} defaultValue={due_date} type='date'
    //                 wtype="outlined" baranimation="solid" inputclass="table-input-class"
    //             />
    //                 : <div className="table-text"
    //                     onClick={() => toggleDateEdit(!editingDate)}
    //                 >{due_date}
    //                 </div>
    //         }
    //     </WCol>

    //     <WCol size="2">
    //         {
    //             editingStatus ? <select
    //                 className='table-select' onBlur={handleStatusEdit}
    //                 autoFocus={true} defaultValue={status}
    //             >
    //                 <option value="complete">complete</option>
    //                 <option value="incomplete">incomplete</option>
    //             </select>
    //                 : <div onClick={() => toggleStatusEdit(!editingStatus)} className={`${completeStyle} table-text`}>
    //                     {status}
    //                 </div>
    //         }
    //     </WCol>

    //     <WCol size="2">
    //         {
    //             editingAssigned || assigned_to === ''
    //                 ? <WInput
    //                     className='table-input' onBlur={handleAssignEdit}
    //                     onKeyDown={(e) => {if(e.keyCode === 13) handleAssignEdit(e)}}

    //                     autoFocus={true} defaultValue={assigned_to} type='text'
    //                     /*wType="outlined" barAnimation="solid" */inputclass="table-input-class"
    //                 />
    //                 : <div className={`${assignedToStyle} table-text`}
    //                     onClick={() => toggleAssignEdit(!editingAssigned)}
    //                 >{assigned_to}
    //                 </div>
    //         }
    //     </WCol>
    //     <WCol size="3">
    //         <div className='button-group'>
    //             <WButton className={canMoveUp ? "table-entry-buttons" : "table-entry-buttons-disabled"} onClick={canMoveUp ? () => props.reorderItem(data._id, -1) : disabledButton } wType="texted">
    //                 <i className="material-icons">expand_less</i>
    //             </WButton>
    //             <WButton className={canMoveDown ? "table-entry-buttons" : "table-entry-buttons-disabled"} onClick={canMoveDown ? () => props.reorderItem(data._id, 1) : disabledButton } wType="texted">
    //                 <i className="material-icons">expand_more</i>
    //             </WButton>
    //             <WButton className="table-entry-buttons" onClick={() => props.deleteItem(data, props.index)} wType="texted">
    //                 <i className="material-icons">close</i>
    //             </WButton>
    //         </div>
    //     </WCol>
    // </WRow>
    );
};

export default TableEntry;