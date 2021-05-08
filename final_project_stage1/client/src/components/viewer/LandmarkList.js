import React  from 'react';
import LandmarkEntry from './LandmarkEntry';

const LandmarkList = (props) => {
    return (
        props.landmarkList &&
        props.landmarkList.map((entry, index) => (
            <LandmarkEntry 
                key={entry._id} entry={entry} 
                index={index} _id={props._id} 
                deleteLandmark={props.deleteLandmark} 
                editLandmark={props.editLandmark} />
        ))
    );
};

export default LandmarkList;