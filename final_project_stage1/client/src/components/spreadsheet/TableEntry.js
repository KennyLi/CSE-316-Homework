import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const TableEntry = (props) => {
    const { data } = props;

    // const completeStyle = data.completed ? ' complete-task' : ' incomplete-task';
    // const assignedToStyle = data.completed ? 'complete-task-assignedTo' : 'incomplete-task-assignedTo';

    const name = data.name;
    const capital = data.capital;
    const leader = data.leader;


    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);

    const disabledButton = () => {}

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'Unknown';
        const prevName = name;
        if(newName !== prevName) {
            props.editItem(data._id, 'name', newName, prevName);
        }
    };

    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : 'Unknown';
        const prevCapital = capital;
        if(newCapital !== prevCapital) {
            props.editItem(data._id, 'capital', newCapital, prevCapital);
        }
    };

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : 'Unknown';
        const prevLeader = leader;
        if(newLeader !== prevLeader) {
            props.editItem(data._id, 'leader', newLeader, prevLeader);
        }
    }

    const handleNavigateSubregion = () => {
        props.history.push("/spreadsheet/" + data._id)
    }
    
    const handleNavigateLandmark = () => {
        props.history.push("/viewer/" + data._id)
    }

    return (
        <WRow className='table-entry'>
            <WCol size="3">
                <WRow>
                    <WCol size="10">
                        {
                            editingName || name === ''
                                ? <WInput
                                    className='table-input' onBlur={handleNameEdit}
                                    onKeyDown={(e) => {if(e.keyCode === 13) handleNameEdit(e)}}
                                    autoFocus={true} defaultValue={name} type='text'
                                    inputClass="table-input-class"
                                />
                                : <div className="table-text"
                                    onClick={handleNavigateSubregion}
                                >{name}
                                </div>
                        }
                        {/* <div className="table-text" onClick={handleNavigateSubregion}>
                            {name}
                        </div> */}
                    </WCol>
                    <WCol size="1">
                        <WButton onClick={() => toggleNameEdit(!editingName)} wType="texted" hoverAnimation="text-primary">
                            <i className="material-icons">edit</i>
                        </WButton>
                    </WCol>
                    <WCol size="1">
                        <WButton onClick={() => props.deleteItem(data, props.index)} wType="texted" hoverAnimation="text-primary">
                            <i className="material-icons">delete</i>
                        </WButton>
                    </WCol>
                </WRow>
            </WCol>

            <WCol size="2">
                {
                    editingCapital || capital === ''
                        ? <WInput
                            className='table-input' onBlur={handleCapitalEdit}
                            onKeyDown={(e) => {if(e.keyCode === 13) handleCapitalEdit(e)}}
                            autoFocus={true} defaultValue={capital} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleCapitalEdit(!editingCapital)}
                        >{capital}
                        </div>
                }
                {/* <div className="table-text" onClick={disabledButton}>
                    {capital}
                </div> */}
            </WCol>

            <WCol size="2">
                {
                    editingLeader || leader === ''
                        ? <WInput
                            className='table-input' onBlur={handleLeaderEdit}
                            onKeyDown={(e) => {if(e.keyCode === 13) handleLeaderEdit(e)}}
                            autoFocus={true} defaultValue={leader} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleLeaderEdit(!editingLeader)}
                        >{leader}
                        </div>
                }
                {/* <div className="table-text" onClick={disabledButton}>
                    {leader}
                </div> */}
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