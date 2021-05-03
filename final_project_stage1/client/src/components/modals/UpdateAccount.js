import React, { useState } 	from 'react';
import { UPDATE }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const UpdateAccount = (props) => {
	const [input, setInput] = useState({ email: props.user.email, password: '', firstName: props.user.firstName, lastName: props.user.lastName, sameEmail: true });
	const [loading, toggleLoading] = useState(false);
	const [Update] = useMutation(UPDATE);

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		let updated = { ...input, [name]: value };
        if (updated.email !== props.user.email) {
            updated = { ...updated, sameEmail: false};
        } else {
            updated = { ...updated, sameEmail: true};
        }
		setInput(updated);
	};

	const handleUpdateAccount = async (e) => {
        const {sameEmail, ...testInput} = input
		for (let field in testInput) {
            console.log(input[field])
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
		const { loading, error, data } = await Update({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			if(data.update.email === 'already exists') {
				alert('User with that email already registered');
			}
			else {
				props.fetchUser();
			}
			props.setShowUpdate(false);
		};
	};

	return (
		<WModal className="signup-modal"  cover="true" visible={props.setShowUpdate}>
			<WMHeader  className="modal-header" onClose={() => props.setShowUpdate(false)}>
				Update Account
			</WMHeader>

			{
				loading ? <div />
					: <WMMain>
							<WRow className="modal-col-gap signup-modal">
								<WCol size="6">
									<WInput 
										className="" onBlur={updateInput} name="firstName" labelAnimation="up" 
										barAnimation="solid" labelText="First Name" wType="outlined" inputType="text" 
									/>
								</WCol>
								<WCol size="6">
									<WInput 
										className="" onBlur={updateInput} name="lastName" labelAnimation="up" 
										barAnimation="solid" labelText="Last Name" wType="outlined" inputType="text" 
									/>
								</WCol>
							</WRow>

							<div className="modal-spacer">&nbsp;</div>
							<WInput 
								className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
								barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" 
							/>
							<div className="modal-spacer">&nbsp;</div>
							<WInput 
								className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
								barAnimation="solid" labelText="Password" wType="outlined" inputType="password" 
							/>
					</WMMain>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleUpdateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Submit
				</WButton>
			</WMFooter>
			
		</WModal>
	);
}

export default UpdateAccount;
