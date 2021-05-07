import Login 							from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
import UpdateAccount 					from '../modals/UpdateAccount';
import Navbar							from '../navbar/Navbar';
import * as mutations 					from '../../cache/mutations';
import { GET_DB_MAPS } 					from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WLayout, WLHeader, WLMain, WLSide, WLFooter } from 'wt-frontend';
import { WCard, WCMedia, WCContent} 	from 'wt-frontend';
import ViewerLeftSide 					from '../viewer/ViewerLeftSide';
import ViewerRightSide 					from '../viewer/ViewerRightSide';
import { EditParent_Transaction, UpdateMapLandmarks_Transaction } 				from '../../utils/jsTPS';

const Viewer = (props) => {
	const currentId  = props.match.params.id
	// const keyCombination = (e, callback) => {
	// 	if(e.key === 'z' && e.ctrlKey) {
	// 		if(props.tps.hasTransactionToUndo()) {
	// 			tpsUndo();
	// 		}
	// 	}
	// 	else if (e.key === 'y' && e.ctrlKey) { 
	// 		if(props.tps.hasTransactionToRedo()) {
	// 			tpsRedo();
	// 		}
	// 	}
	// }
	// document.onkeydown = keyCombination;

	const auth = props.user === null ? false : true;
	let maps = [];
	const [activeProperties, setActiveProperties] = useState({});
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showUpdate, toggleShowUpdate]	= useState(false);
	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);

	const refetchProperties = (activeRegion) => {
		let temp = activeRegion;
		let path = [];
		while(!temp.root) {
			temp = maps.find(map => map._id === temp.parent)
			path.unshift(temp);
		}
		let parentRegion = maps.find(map => map._id === activeRegion.parent)
		let siblings = parentRegion.children;
		let index = siblings.indexOf(activeRegion._id)
		let prevSibling;
		let nextSibling
		if (siblings.length === 1) {
			prevSibling = null
			nextSibling = null
		} else if (index === 0) {
			prevSibling = null
			nextSibling = siblings[index + 1]
		} else if (index === siblings.length - 1) {
			prevSibling = siblings[index - 1]
			nextSibling = null
		} else {
			prevSibling = siblings[index - 1]
			nextSibling = siblings[index + 1]
		}
		let parentList;
		if (parentRegion.root) {
			parentList = maps.filter(map => map.root)
		} else {
			let grandparentRegion = maps.find(map => map._id === parentRegion.parent)
			parentList = grandparentRegion.children.map(_id => maps.find(map => map._id === _id))
		}
		return {parent: parentRegion, path: path, parentList: parentList, prev: prevSibling, next: nextSibling, landmarks: activeRegion.landmarks}
	}

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		// Assign todolists
		for(let todo of data.getAllMaps) {
			maps.push(todo)
		}
		if (!activeProperties._id) {
			props.tps.clearAllTransactions();
			let activeRegion = maps.find(map => map._id === currentId)
			if (activeRegion && !activeRegion.root) {
				const { parent, path, parentList, prev, next, landmarks } = refetchProperties(activeRegion);
				let tempLandmark = [{name: "landmark placeholder 1"}, {name: "landmark placeholder 2"}, {name: "landmark placeholder 3"}]
				setActiveProperties({_id : activeRegion._id, 
									name: activeRegion.name,
									parent: parent, 
									capital: activeRegion.capital, 
									leader: activeRegion.leader,
									subregions: activeRegion.children.length,
									landmarks: landmarks,
									path: path,
									parentList: parentList,
									prev: prev,
									next: next})
			}
		}
	}


	// NOTE: might not need to be async
	const reloadList = () => {
		if (activeProperties._id) {
			let activeRegion = maps.find(map => map._id === activeProperties._id)
			const { parent, path, parentList, prev, next, landmarks } = refetchProperties(activeRegion);
			let tempLandmark = [{name: "landmark placeholder 1"}, {name: "landmark placeholder 2"}, {name: "landmark placeholder 3"}]
			setActiveProperties({...activeProperties, 
								parent: parent, 
								landmarks: landmarks, 
								path: path,  
								parentList: parentList, 
								prev: prev, 
								next: next})
		}
	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAPS }], 
		awaitRefetchQueries: true,
		onCompleted: () => reloadList()
	}

	const [UpdateParent] 		= useMutation(mutations.UPDATE_PARENT, mutationOptions);
	const [AddLandmark]			= useMutation(mutations.ADD_LANDMARK, mutationOptions);
	const [DeleteLandmark]		= useMutation(mutations.DELETE_LANDMARK, mutationOptions);
	
	
	const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const editParent = async (listID, newParent, prevParent) => {
		let transaction = new EditParent_Transaction(listID, newParent, prevParent, UpdateParent);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const addLandmark = async (name) => {
		const newItem = {
			_id: '',
			name: name,
			parent_id: activeProperties._id,
			parent: activeProperties.name
		};
		let opcode = 1;
		let itemID = newItem._id;
		let listID = activeProperties._id;
		let transaction = new UpdateMapLandmarks_Transaction(listID, itemID, newItem, opcode, AddLandmark, DeleteLandmark);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const deleteLandmark = async (landmark, index) => {
		let listID = activeProperties._id;
		let itemID = landmark._id;
		let opcode = 0;
		let itemToDelete = {
			_id: landmark._id,
			name: landmark.name,
			parent_id: landmark.parent_id,
			parent: landmark.parent
		}
		let transaction = new UpdateMapLandmarks_Transaction(listID, itemID, itemToDelete, opcode, AddLandmark, DeleteLandmark, index);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const setShowLogin = () => {
		toggleShowCreate(false);
		toggleShowUpdate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowCreate(!showCreate);
	};

	const setShowUpdate = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(!showUpdate);
	};

	return (
        <WLayout wLayout="header">
			<WLHeader>
				<Navbar 
					fetchUser={props.fetchUser} 	auth={auth} 
					setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
					reloadTodos={refetch}			history={props.history}
					user={props.user}				ancestors={activeProperties.path}
					setShowUpdate={setShowUpdate}
					prev={activeProperties.prev}	next={activeProperties.next}/>
			</WLHeader>
			<WLMain>
				{ activeProperties._id ? 
                <WCard className="viewer">
                    <WLayout className="viewer-layout" wLayout="rside">
						<ViewerLeftSide 
							activeProperties={activeProperties} history={props.history} 
							editParent={editParent}
							undo={tpsUndo} 					redo={tpsRedo}
							canUndo={canUndo} 				canRedo={canRedo}/>
						<ViewerRightSide 
							landmarkList={activeProperties.landmarks} 
							addLandmark={addLandmark}
							deleteLandmark={deleteLandmark}/>
                    </WLayout>
                </WCard>
				:
				<></>
				}	
			</WLMain>
        {
            showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
        }
        {
            showLogin && (<Login fetchUser={props.fetchUser} reloadTodos={refetch} setShowLogin={setShowLogin} />)
        }
		{
			showUpdate && (<UpdateAccount fetchUser={props.fetchUser} user={props.user} setShowUpdate={setShowUpdate} />)
		}		
        </WLayout>
	);
};

export default Viewer;