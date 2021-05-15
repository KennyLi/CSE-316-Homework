import React, { useState } from 'react';
import { WRow, WCol, WButton, WInput }       from 'wt-frontend';

const LandmarkEntry = (props) => {

    const landmark = props.entry.name
    const [editingLandmark, toggleLandmarkEdit] = useState(false);
    
    const handleLandmarkEdit = (e) => {
        if (props._id === props.entry.parent_id) {
            toggleLandmarkEdit(false);
            const newLandmark = e.target.value ? e.target.value : 'Unknown';
            const prevLandmark = landmark;
            if(newLandmark !== prevLandmark) {
                props.editLandmark(props.entry._id, newLandmark, prevLandmark);
            }
        }
    };
    
    return (
        <WRow>
            { props._id === props.entry.parent_id ?
                <>
                <WCol className="viewer-landmark viewer-text"size="1">
                    <WButton className="viewer-button" onClick={() => {props.deleteLandmark(props.entry, props.index)}} wType="texted" hoverAnimation="text-primary">
                        <i className="material-icons">delete</i>
                    </WButton>
                </WCol>
                <WCol className="viewer-landmark viewer-text"size="5">
                    {
                        editingLandmark && props._id === props.entry.parent_id
                        ? <WInput
                            className='table-input' onBlur={handleLandmarkEdit}
                            onKeyDown={(e) => {if(e.keyCode === 13) handleLandmarkEdit(e)}}
                            autoFocus={true} defaultValue={landmark} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="viewer-table-text viewer-table-text-edit"
                                onClick={() => toggleLandmarkEdit(!editingLandmark)}
                        >
                            {landmark}
                        </div>
                    }
                </WCol>
                </>
            :
                <WCol className="viewer-landmark viewer-text"size="6">
                    <div className="viewer-table-text">
                        {landmark}
                    </div>
                </WCol>
            }
            <WCol className="viewer-landmark viewer-text"size="1">-</WCol>
            <WCol className="viewer-landmark viewer-text"size="5">{props.entry.parent}</WCol>
        </WRow>
    );
};

export default LandmarkEntry;