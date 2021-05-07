import React  from 'react';
import LandmarkEntry from './LandmarkEntry';

const LandmarkList = (props) => {
    return (
        props.landmarkList &&
        props.landmarkList.map((entry, index) => (
            <LandmarkEntry key={entry._id} entry={entry} index={index} deleteLandmark={props.deleteLandmark}/>
        ))
    );
};

export default LandmarkList;