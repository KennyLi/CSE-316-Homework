import React from 'react';
import { WLSide, WLayout, WLHeader, WSidebar } 	from 'wt-frontend';
import LandmarkList from './LandmarkList';

const ViewerRightSide = (props) => {

    return (<WLSide side="right">
                <WLayout className="viewer-right-layout" wLayout="header">
                    <WLHeader className="viewer-header">Region Landmarks:</WLHeader>
                    <WSidebar>
                        <LandmarkList landmarkList={props.landmarkList}/>
                    </WSidebar>
                </WLayout>
            </WLSide>
    );
};

export default ViewerRightSide;