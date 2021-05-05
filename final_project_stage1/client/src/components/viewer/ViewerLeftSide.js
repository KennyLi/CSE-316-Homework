import React from 'react';
import { WLMain, WRow, WCol, WButton, WCard } 	from 'wt-frontend';

const ViewerLeftSide = (props) => {
    // const [editingParent, toggleParentEdit] = useState(false);
    // const handleParentEdit = (e) => {
    //     toggleParentEdit(false);
    //     const newParent = e.target.value ? e.target.value : false;
    //     const prevParent = Parent;
    //     if(newParent !== prevParent) {
    //         props.editItem(data._id, 'completed', newParent, prevParent);
    //     }
    // };

    return (<WLMain>
				<WRow>
					<WCol size="1">
						<WButton onClick={() => {}} wType="texted" className="table-header-button" clickAnimation="ripple-light">
							<i className="material-icons">undo</i>
						</WButton>
                    </WCol>
					<WCol size="1">
                        <WButton onClick={() => {}} wType="texted" className="table-header-button" clickAnimation="ripple-light">
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
					<WCol size="6">
						{/* {
							editingParent ? <select
								className='table-select' onBlur={handleParentEdit}
								autoFocus={true} defaultValue={props.activeProperties.parent}
							>
								<option value="complete">complete</option>
								<option value="incomplete">incomplete</option>
							</select>
								: <div onClick={() => toggleParentEdit(!editingParent)} className={`${completeStyle} table-text`}>
									{props.activeProperties.parent}
								</div>
						} */}
						<div className="viewer-text">
							{"Parent Region: " + props.activeProperties.parent}
						</div>
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