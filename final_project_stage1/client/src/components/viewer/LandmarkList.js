import React  from 'react';
import LandmarkEntry from './LandmarkEntry';

const LandmarkList = (props) => {
    return (
        props.landmarkList &&
        props.landmarkList.map(entry => (
            <LandmarkEntry key={Math.floor(Math.random() * 100000000000)} name={entry.name}/>
        ))
    );
};

export default LandmarkList;