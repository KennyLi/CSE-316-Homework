import Login 							from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
import UpdateAccount 					from '../modals/UpdateAccount';
import Navbar							from '../navbar/Navbar';
import { GET_DB_MAPS } 					from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WLayout, WLHeader, WLMain, WLSide, WLFooter } from 'wt-frontend';
import { WCard, WCMedia, WCContent} 	from 'wt-frontend';
import ViewerLeftSide 					from '../viewer/ViewerLeftSide';
import ViewerRightSide 					from '../viewer/ViewerRightSide';

const Viewer = (props) => {
	let path = props.location.pathname.split("/").filter(arg => arg !== "");
	path.shift();
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
	// const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	// const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		// Assign todolists
		for(let todo of data.getAllMaps) {
			maps.push(todo)
		}
		let valid = true;
		if (!activeProperties._id) {
			let regionPath = path.map(arg => maps.find(map => map._id === arg))
			let lastIndex = regionPath.length - 1;
			if (regionPath[lastIndex]) {
				for(let i = 0; i < lastIndex; i++) {
					let temp = regionPath[i]
					if (temp) {
						if (!(temp.children.includes(regionPath[i + 1]._id))) {
							valid = false;
							break
						}
					} else {
						valid = false;
					}
				}
			} else {
				valid = false;
			}
			if (valid && regionPath.length > 1) {
				let activeRegion = regionPath[lastIndex]
				let parentRegion = regionPath[lastIndex - 1]
				let tempLandmark = [{name: "landmark placeholder 1"}, {name: "landmark placeholder 2"}, {name: "landmark placeholder 3"}]
				setActiveProperties({_id : activeRegion._id, 
									 name: activeRegion.name, 
									 parent: parentRegion.name, 
									 capital: activeRegion.capital, 
									 leader: activeRegion.leader,
									 subregions: activeRegion.children.length,
									 landmarks: tempLandmark,
									 path: regionPath.slice(0, -1)})
			}
		}
	}


	// NOTE: might not need to be async
	const reloadList = () => {
		if (activeProperties._id) {
			let activeRegion = maps.find(map => map._id === activeProperties._id)
			let tempLandmark = [{name: "landmark placeholder 1"}, {name: "landmark placeholder 2"}, {name: "landmark placeholder 3"}]
			setActiveProperties({...activeProperties, landmarks: tempLandmark})
		}
	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAPS }], 
		awaitRefetchQueries: true,
		onCompleted: () => reloadList()
	}

	// const [ReorderTodoItems] 		= useMutation(mutations.REORDER_ITEMS, mutationOptions);
	// const [sortTodoItems] 		= useMutation(mutations.SORT_ITEMS, mutationOptions);
	// const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD, mutationOptions);
	// const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM, mutationOptions);
	// const [AddSubregion] 			= useMutation(mutations.ADD_SUBREGION, mutationOptions);
	
	// const tpsUndo = async () => {
	// 	const ret = await props.tps.undoTransaction();
	// 	if(ret) {
	// 		setCanUndo(props.tps.hasTransactionToUndo());
	// 		setCanRedo(props.tps.hasTransactionToRedo());
	// 	}
	// }

	// const tpsRedo = async () => {
	// 	const ret = await props.tps.doTransaction();
	// 	if(ret) {
	// 		setCanUndo(props.tps.hasTransactionToUndo());
	// 		setCanRedo(props.tps.hasTransactionToRedo());
	// 	}
	// }

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
					path={props.location.pathname}  setShowUpdate={setShowUpdate}/>
			</WLHeader>
			<WLMain>
				{ activeProperties._id ? 
                <WCard className="viewer">
                    <WLayout className="viewer-layout" wLayout="rside">
						<ViewerLeftSide activeProperties={activeProperties}/>
						<ViewerRightSide landmarkList={activeProperties.landmarks}/>
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