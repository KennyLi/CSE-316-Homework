import React, { useState } 				from 'react';
import { WModal, WMHeader, WMMain, WButton, WInput, WMFooter } from 'wt-frontend';

const CreateMap = (props) => {
    const [input, setInput] = useState("");

    const updateInput = (e) => {
		setInput(e.target.value);
	};

    const handleCreateMap = () => {
		if (!input) {
			alert('Map name must be filled out');
			return;
        }
        props.createNewMap(input);
        props.setShowCreateMap();
	};

    return (
		<WModal className="signup-modal"  cover="true" visible={props.setShowCreateMap}>
			<WMHeader className="modal-header" onClose={props.setShowCreateMap}>
				Create Map
			</WMHeader>
			<WMMain>
				    <WInput 
					className="modal-input" onBlur={updateInput} labelAnimation="up" 
					barAnimation="solid" labelText="Map Name" wType="outlined" inputType="text" 
					/>
			</WMMain>
			<WMFooter>
				<WButton className="modal-button" onClick={handleCreateMap} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Submit
				</WButton>
			</WMFooter>
			
		</WModal>
    );
}

export default CreateMap;