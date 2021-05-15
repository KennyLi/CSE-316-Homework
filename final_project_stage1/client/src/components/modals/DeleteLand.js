import React from 'react';

import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const deleteLand = (props) => {

    const handleDelete = async () => {
        props.deleteItem(props.landmark.data, props.landmark.index);
        props.setShowDelete();
    }

    return (
        <WModal className="delete-modal" cover="true" visible={props.setShowDelete}>
            <WMHeader className="modal-header" onClose={props.setShowDelete}>
                Delete Landmark?
			</WMHeader >

            <WMMain>
                <WButton className="modal-button" onClick={handleDelete} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Delete
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button cancel-button" onClick={props.setShowDelete} wType="texted">
                    Cancel
				</WButton>
            </WMMain>

        </WModal >
    );
}

export default deleteLand;