import React, { useState } 				from 'react';
import { WLMain, WRow, WCol, WButton, WCard } 	from 'wt-frontend';

const ViewerLeftSide = (props) => {
    const [editingParent, toggleParentEdit] = useState(false);
    const handleParentEdit = (e) => {
        const newParent = e.target.value ? e.target.value : false;
        const prevParent = props.activeProperties.parent._id;
        if(newParent !== prevParent) {
            props.editParent(props.activeProperties._id, newParent, prevParent);
        }
		toggleParentEdit(false);
    };

	const clickDisabled = () => { };

	const undoOptions = {
        className: !props.canUndo ? ' table-header-button-disabled ' : 'table-header-button',
        onClick: !props.canUndo  ? clickDisabled : props.undo,
        wType: "texted", 
        clickAnimation: !props.canUndo ? "" : "ripple-light",  
        shape: "rounded"
    }

    const redoOptions = {
        className: !props.canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick: !props.canRedo   ? clickDisabled : props.redo, 
        wType: "texted", 
        clickAnimation: !props.canRedo ? "" : "ripple-light" ,
        shape: "rounded"
    }

	const createSelectOptions = () => {
		let select = [];
		for (let parent of props.activeProperties.parentList) {
			select.push(<option key={parent._id} value={parent._id}>{parent.name}</option>);
		}
		return select
	}

	const handleNavigate = () => {
		props.history.push("/spreadsheet/" + props.activeProperties.parent._id)
	}

    return (<WLMain>
				<WRow>
					<WCol size="1">
                        <WButton {...undoOptions}>
                                <i className="material-icons">undo</i>
                        </WButton>
                    </WCol>
					<WCol size="1">
						<WButton {...redoOptions}>
                                <i className="material-icons">redo</i>
                        </WButton>           
					</WCol>
				</WRow>
				<WRow>
					<WCard></WCard>
				</WRow>
				<WRow>
					<WCol size="6">
						<div className="viewer-text">
							{"Region Name: " + props.activeProperties.name}
						</div>
					</WCol>
				</WRow>
				<WRow>
					<WCol className="viewer-parent-list" size="12">
							{
								
								editingParent ? 
								<>
								<div className="viewer-text" >{"Parent Region: "}</div>
								<select
    								className='table-select' onBlur={handleParentEdit}
    								autoFocus={true} defaultValue={props.activeProperties._id}
								>
									{createSelectOptions()}
    							</select>
								</>
									: <div className="viewer-text" >
										{"Parent Region: "}
										<span className="viewer-parent-text" onClick={handleNavigate}>
											{props.activeProperties.parent.name}
										</span>
									</div>
							}
							<WButton onClick={() => {toggleParentEdit(!editingParent)}} wType="texted" className="viewer-edit-button" hoverAnimation="text-primary">
								<i className="material-icons">edit</i>
							</WButton>
					</WCol>
				</WRow>
				<WRow>
					<WCol size="6">
						<div className="viewer-text">
						    {"Region Capital: " + props.activeProperties.capital}
					    </div>
					</WCol>
				</WRow>
				<WRow>
					<WCol size="6">
						<div className="viewer-text">
							{"Region Leader: " + props.activeProperties.leader}
						</div>
					</WCol>
				</WRow>
				<WRow>
					<WCol size="6">
						<div className="viewer-text">
							{"# of Subregions: " + props.activeProperties.subregions}
						</div>
					</WCol>
				</WRow>
            </WLMain>
    );
};

export default ViewerLeftSide;