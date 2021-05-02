import React  from 'react';
import { WRow, WCol }       from 'wt-frontend';

const LandmarkEntry = (props) => {
    return (
        <WRow>
            <WCol className="viewer-landmark"size="12">{props.name}</WCol>
        </WRow>
    );
};

export default LandmarkEntry;