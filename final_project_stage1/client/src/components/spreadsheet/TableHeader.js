import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const TableHeader = (props) => {
    const clickDisabled = () => { };
    
    const undoOptions = {
        className: !props.canUndo ? ' table-header-button-disabled ' : 'table-header-button',
        onClick: !props.canUndo  ? clickDisabled : props.undo,
        wType: "texted", 
        clickAnimation: !props.canUndo ? "" : "ripple-light",  
        shape: "rounded"
    }

    const redoOptions = {
        className: !props.canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick: !props.canRedo   ? clickDisabled : props.redo, 
        wType: "texted", 
        clickAnimation: !props.canRedo ? "" : "ripple-light" ,
        shape: "rounded"
    }

    return (
        <>
        <WRow className="table-header spreadsheet-header">
            <WCol size="3">
                <WRow>
                    <WCol size="4">
                        <WButton onClick={props.addItem} wType="texted" className="table-header-button" clickAnimation="ripple-light">
                            <i className="material-icons">add_box</i>
                        </WButton>
                    </WCol>
                    <WCol size="4">
                        <WButton {...undoOptions}>
                                <i className="material-icons">undo</i>
                        </WButton>
                    </WCol>
                    <WCol size="4">
                        <WButton {...redoOptions}>
                                <i className="material-icons">redo</i>
                        </WButton>
                    </WCol>
                </WRow>
            </WCol>
            <WCol size="6">
                <div className='region-header'>{"Region Name: " + props.name}</div>
            </WCol>
        </WRow>
        <WRow className="table-header spreadsheet-table-header">
            <WCol size="3">
                <WRow>
                    <WCol size="1"></WCol>
                    <WCol size="10"><WButton onClick={() => {props.sort('name')}} className='table-header-section' wType="texted" >Name</WButton></WCol>
                    <WCol size="1"></WCol>
                </WRow>
            </WCol>
            <WCol size="2">
                <WButton onClick={() => {props.sort('capital')}} className='table-header-section' wType="texted">Capital</WButton>
            </WCol>
            <WCol size="2">
                <WButton onClick={() => {props.sort('leader')}} className='table-header-section' wType="texted" >Leader</WButton>
            </WCol>
            <WCol size="1">
                <WButton onClick={clickDisabled} className='table-header-section' wType="texted" >Flag</WButton>
            </WCol>
            <WCol size="4">
                <WButton onClick={clickDisabled} className='table-header-section' wType="texted" >Landmarks</WButton>
            </WCol>
        </WRow>
        </>
    );
};

export default TableHeader;