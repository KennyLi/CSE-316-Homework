import React, { useState } 				from 'react';
import { WLSide, WLayout, WLHeader, WSidebar, WLFooter, WButton, WInput } 	from 'wt-frontend';
import LandmarkList from './LandmarkList';

const ViewerRightSide = (props) => {
    const [input, setInput] = useState("");
    
    let nameList = props.landmarkList.map(entry => entry.name.toLowerCase());
    
    const handleSubmit = () => {
        if (input !== "" && !nameList.includes(input.toLowerCase())) {
            props.addLandmark(input)
        }
    }

    return (<WLSide className="viewer-rightside" side="right">
                <WLayout className="viewer-right-layout" wLayout="header-footer">
                    <WLHeader className="viewer-header">Region Landmarks:</WLHeader>
                    <WSidebar className="viewer-sidebar">
                        <LandmarkList 
                            landmarkList={props.landmarkList} deleteLandmark={props.deleteLandmark} 
                            editLandmark={props.editLandmark} _id={props._id}
                            nameList={nameList}/>
                    </WSidebar>
                    <WLFooter className="viewer-footer">
                        <WButton className="viewer-button" onClick={handleSubmit} wType="texted" hoverAnimation="text-primary">
							<i className="material-icons">add_box</i>
						</WButton>
                        <WInput
                            className='table-input'
                            onChange={(e) => {setInput(e.target.value)}}
                            onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit()}} type='text'
                            inputClass="table-input-class"
                        />
                    </WLFooter>
                </WLayout>
            </WLSide>
    );
};

export default ViewerRightSide;