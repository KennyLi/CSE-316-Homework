import React  from 'react';
import { WRow, WCol, WButton }       from 'wt-frontend';

const LandmarkEntry = (props) => {

    return (
        <WRow>
            <WCol className="viewer-landmark"size="1">
                <WButton className="viewer-button" onClick={() => {props.deleteLandmark(props.entry, props.index)}} wType="texted" hoverAnimation="text-primary">
					<i className="material-icons">delete</i>
				</WButton>
            </WCol>
            <WCol className="viewer-landmark"size="5">{props.entry.name}</WCol>
            <WCol className="viewer-landmark"size="1">-</WCol>
            <WCol className="viewer-landmark"size="5">{props.entry.parent}</WCol>
        </WRow>
    );
};

export default LandmarkEntry;