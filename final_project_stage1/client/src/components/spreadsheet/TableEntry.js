import React, { useState, useEffect } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const TableEntry = (props) => {
    const { data } = props;
    const name = data.name;
    const capital = data.capital;
    const leader = data.leader;
    const flag = data.flag;

    const landmarks = data.landmarks.length === 0 ? "None" : data.landmarks.map(landmark => landmark.name).join(", ")
    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);

    useEffect(() => {
        if(props.coordinates) {
            const { row, col } = props.coordinates
            toggleNameEdit(row === props.index && col === 0)
            toggleCapitalEdit(row === props.index && col === 1)
            toggleLeaderEdit(row === props.index && col === 2)
        }
    }, [props.coordinates, props.index])

    const disabledButton = () => {}

    const handleNameEdit = (e) => {
        props.setCoordinates({})
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'Unknown';
        const prevName = name;
        if(newName !== prevName) {
            props.editItem(data._id, 'name', newName, prevName);
        }
    };

    const handleCapitalEdit = (e) => {
        props.setCoordinates({})
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : 'Unknown';
        const prevCapital = capital;
        if(newCapital !== prevCapital) {
            props.editItem(data._id, 'capital', newCapital, prevCapital);
        }
    };

    const handleLeaderEdit = (e) => {
        props.setCoordinates({})
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : 'Unknown';
        const prevLeader = leader;
        if(newLeader !== prevLeader) {
            props.editItem(data._id, 'leader', newLeader, prevLeader);
        }
    }

    const handleNameKeyDown = (e, row) => {
        if(e.keyCode === 13) {
            handleNameEdit(e)
        } else if (e.keyCode === 38 && row !== 0) { //up
            handleNameEdit(e)
            props.setCoordinates({row: row - 1, col: 0})
        } else if (e.keyCode === 39) { //right
            handleNameEdit(e)
            props.setCoordinates({row: row, col: 1})
        } else if (e.keyCode === 40 && row !== props.entryCount - 1) { //down
            handleNameEdit(e)
            props.setCoordinates({row: row + 1, col: 0})
        }
    }

    const handleCapitalKeyDown = (e, row) => {
        if(e.keyCode === 13) {
            handleCapitalEdit(e)
        } else if (e.keyCode === 37) { //left
            handleCapitalEdit(e)
            props.setCoordinates({row: row, col: 0})
        } else if (e.keyCode === 38 && row !== 0) { //up
            handleCapitalEdit(e)
            props.setCoordinates({row: row - 1, col: 1})
        } else if (e.keyCode === 39) { //right
            handleCapitalEdit(e)
            props.setCoordinates({row: row, col: 2})
        } else if (e.keyCode === 40 && row !== props.entryCount - 1) { //down
            handleCapitalEdit(e)
            props.setCoordinates({row: row + 1, col: 1})
        }
    }

    const handleLeaderKeyDown = (e, row) => {
        if(e.keyCode === 13) {
            handleLeaderEdit(e)
        } else if (e.keyCode === 37) { //left
            handleLeaderEdit(e)
            props.setCoordinates({row: row, col: 1})
        } else if (e.keyCode === 38 && row !== 0) { //up
            handleLeaderEdit(e)
            props.setCoordinates({row: row - 1, col: 2})
        } else if (e.keyCode === 40 && row !== props.entryCount - 1) { //down
            handleLeaderEdit(e)
            props.setCoordinates({row: row + 1, col: 2})
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
                <WRow className="name-row">
                    <WCol size="1">
                        <WButton className="name-row" onClick={() => props.deleteItem(data, props.index)} wType="texted" hoverAnimation="text-primary">
                            <i className="material-icons">delete</i>
                        </WButton>
                    </WCol>
                    <WCol size="10">
                        {
                            editingName || name === ''
                                ? <WInput
                                    className='table-input' onBlur={handleNameEdit}
                                    onKeyDown={(e) => handleNameKeyDown(e, props.index)}
                                    autoFocus={true} defaultValue={name} type='text'
                                    inputClass="spreadsheet-input-class"
                                />
                                : 
                                <div className="table-container">
                                    <span className="table-text"
                                        onClick={handleNavigateSubregion}
                                    >{name}
                                    </span>
                                </div>
                        }
                    </WCol>
                    <WCol size="1">
                        <WButton className="name-row" onClick={() => toggleNameEdit(!editingName)} wType="texted" hoverAnimation="text-primary">
                            <i className="material-icons">edit</i>
                        </WButton>
                    </WCol>
                </WRow>
            </WCol>

            <WCol size="2">
                {
                    editingCapital || capital === ''
                        ? <WInput
                            className='table-input' onBlur={handleCapitalEdit}
                            onKeyDown={(e) => handleCapitalKeyDown(e, props.index)}
                            autoFocus={true} defaultValue={capital} type='text'
                            inputClass="spreadsheet-input-class"
                        />
                        : 
                        <div className="table-container">
                            <span className="table-text"
                                onClick={() => toggleCapitalEdit(!editingCapital)}
                            >{capital}
                            </span>
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingLeader || leader === ''
                        ? <WInput
                            className='table-input' onBlur={handleLeaderEdit}
                            onKeyDown={(e) => handleLeaderKeyDown(e, props.index)}
                            autoFocus={true} defaultValue={leader} type='text'
                            inputClass="spreadsheet-input-class"
                        />
                        : 
                        <div className="table-container">
                            <span className="table-text"
                                onClick={() => toggleLeaderEdit(!editingLeader)}
                            >{leader}
                            </span>
                        </div>
                }
            </WCol>

            <WCol size="1">
                {flag ? 
                    <img src={flag}></img>    
                :
                    <div className="flag-text">
                        None
                    </div>
                }
            </WCol>
            <WCol size="4">
                <div className="table-container" onClick={handleNavigateLandmark}>
                    <span className="table-text">{landmarks}</span>
                </div>
            </WCol>
        </WRow>
    );
};

export default TableEntry;