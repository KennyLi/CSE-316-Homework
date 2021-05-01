import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import { GET_DB_MAPS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WLFooter } from 'wt-frontend';
import { WCard, WCMedia, WCContent } 	from 'wt-frontend';

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
	const [subregionList, setSubregionList] = useState([]);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
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
		if (activeProperties && Object.keys(activeProperties).length === 0) {
			for(let i = 0; i < path.length - 1; i++) {
				let temp = maps.find(map => map._id === path[i]).children;
				if (!(temp.includes(path[i + 1]))) {
					valid = false;
					break
				}
			}
			if (valid) {
				let activeRegion = maps.find(map => map._id === path[path.length - 1])
                let parentRegion = maps.find(map => map._id === path[path.length - 2])
				if (parentRegion) {
					setSubregionList(activeRegion.landmarks)
					setActiveProperties({_id : activeRegion._id, name: activeRegion.name})
				}
			}
		}
	}


	// NOTE: might not need to be async
	const reloadList = () => {
		let _id = activeProperties._id
		if (_id !== '') {
			let activeRegion = maps.find(map => map._id === _id)
			let temp = []
			for(let subregion of activeRegion.children) {
				temp.push(maps.find(map => map._id === subregion))
			}
			setSubregionList(temp)
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
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	return (
        <WLayout wLayout="header">
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem hoverAnimation="lighten">
							<Logo history={props.history}/>
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} 	auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							reloadTodos={refetch} 			history={props.history}
							user={props.user}				
						/>
					</ul>
				</WNavbar>
			</WLHeader>
			<WLMain>
                <WCard className="viewer">
                    <WLayout className="viewer-layout" wLayout="rside">
                        <WLMain>
                        </WLMain>
                        <WLSide side="right">
                            <WSidebar>
                            </WSidebar>
                        </WLSide>

                    </WLayout>
                </WCard>
			</WLMain>
        {
            showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
        }

        {
            showLogin && (<Login fetchUser={props.fetchUser} reloadTodos={refetch} setShowLogin={setShowLogin} />)
        }
        </WLayout>
	);
};

export default Viewer;