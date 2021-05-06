
import Login 							from '../modals/Login';
import MainContents 					from '../spreadsheet/MainContents';
import CreateAccount 					from '../modals/CreateAccount';
import UpdateAccount 					from '../modals/UpdateAccount';
import Navbar							from '../navbar/Navbar';
import * as mutations 					from '../../cache/mutations';
import { GET_DB_MAPS } 					from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WLayout, WLHeader, WLMain, WCard} from 'wt-frontend';
import { UpdateMapSubregions_Transaction, EditSubregion_Transaction, SortSubregion_Transaction } 				from '../../utils/jsTPS';

const Spreadsheet = (props) => {
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
	const [sortRule, setSortRule] = useState('unsorted'); // 1 is ascending, -1 desc
	const [activeProperties, setActiveProperties] = useState({});
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showUpdate, toggleShowUpdate]	= useState(false);
	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);

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
				if (activeRegion) {
				let temp = activeRegion;
				let path = [];
				while(!temp.root) {
					temp = maps.find(map => map._id === temp.parent)
					path.unshift(temp);
				}
				let subregions = activeRegion.children.map(_id => maps.find(map => map._id === _id))
				setActiveProperties({_id : activeRegion._id, name: activeRegion.name, subregions: subregions, path: path})
			}
		}
	}


	// NOTE: might not need to be async
	const reloadList = async () => {
		if (activeProperties._id) {
			let activeRegion = maps.find(map => map._id === activeProperties._id)
			let subregions = activeRegion.children.map(_id => maps.find(map => map._id === _id))
			setActiveProperties({...activeProperties, subregions: subregions})
		}
	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAPS }], 
		awaitRefetchQueries: true,
		onCompleted: () => reloadList()
	}

	const [SortSubregion] 		= useMutation(mutations.SORT_SUBREGION, mutationOptions);
	const [UpdateSubregionField] 	= useMutation(mutations.UPDATE_SUBREGION_FIELD, mutationOptions);
	const [DeleteSubregion] 			= useMutation(mutations.DELETE_SUBREGION, mutationOptions);
	const [AddSubregion] 			= useMutation(mutations.ADD_SUBREGION, mutationOptions);


	
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

	const addItem = async () => {
		const newItem = {
			_id: '',
			owner: props.user._id,
			root: false,
			name: 'Unknown',
			capital: 'Unknown',
			leader: 'Unknown',
			parent: activeProperties._id,
			children: [],
			landmarks: [],
			sortRule: 'name',
			sortDirection: -1
		};
		let opcode = 1;
		let itemID = newItem._id;
		let listID = activeProperties._id;
		let transaction = new UpdateMapSubregions_Transaction(listID, itemID, newItem, opcode, AddSubregion, DeleteSubregion);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const deleteItem = async (subregion, index) => {
		let listID = activeProperties._id;
		let itemID = subregion._id;
		let opcode = 0;
		let itemToDelete = {
			_id: subregion._id,
			owner: subregion.owner,
			root: subregion.root,
			name: subregion.name,
			capital: subregion.leader,
			leader: subregion.capital,
			parent: subregion.parent,
			children: subregion.children,
			landmarks: subregion.landmarks,
			sortRule: subregion.sortRule,
			sortDirection: subregion.sortDirection,
		}
		let transaction = new UpdateMapSubregions_Transaction(listID, itemID, itemToDelete, opcode, AddSubregion, DeleteSubregion, index);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const editItem = async (itemID, field, value, prev) => {
		let transaction = new EditSubregion_Transaction(itemID, field, prev, value, UpdateSubregionField);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

	const sort = (criteria) => {
		let prevSortRule = sortRule;
		setSortRule(criteria);
		let transaction = new SortSubregion_Transaction(activeProperties._id, criteria, prevSortRule, SortSubregion);
		console.log(transaction)
		props.tps.addTransaction(transaction);
		tpsRedo();
	}

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
				{
					activeProperties._id ? 
						<WCard className="spreadsheet">
								<MainContents
									addItem={addItem} 				deleteItem={deleteItem}
									editItem={editItem}				sort={sort}
									undo={tpsUndo} 					redo={tpsRedo}
									canUndo={canUndo} 				canRedo={canRedo}
									activeProperties={activeProperties}
									history={props.history}
								/>
						</WCard>
						:
					<></>
				}
			</WLMain>
			{/* {
					activeList ? 
							<div className="container">
								<MainContents
									addItem={addItem} 				deleteItem={deleteItem}
									editItem={editItem} 			reorderItem={reorderItem} 	
									undo={tpsUndo} redo={tpsRedo}
									activeList={activeList} 		setActiveList={loadTodoList}
									canUndo={canUndo} 				canRedo={canRedo}
									sort={sort}
								/>
							</div>
						:
							<div className="container" />
			} */}
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

export default Spreadsheet;