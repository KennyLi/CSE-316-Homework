
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

// import { UpdateListField_Transaction, 
// 	SortItems_Transaction,
// 	UpdateListItems_Transaction, 
// 	ReorderItems_Transaction, 
// 	EditItem_Transaction } 				from '../../utils/jsTPS';

const Spreadsheet = (props) => {
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
	// const [sortRule, setSortRule] = useState('unsorted'); // 1 is ascending, -1 desc
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
			if (valid) {
				let activeRegion = regionPath[lastIndex]
				let temp = activeRegion.children.map(_id => maps.find(map => map._id === _id))
				setActiveProperties({_id : activeRegion._id, name: activeRegion.name, subregions: temp, path: regionPath.slice(0, -1)})
			}
		}
	}


	// NOTE: might not need to be async
	const reloadList = () => {
		if (activeProperties._id) {
			let activeRegion = maps.find(map => map._id === activeProperties._id)
			let temp = activeRegion.children.map(_id => maps.find(map => map._id === _id))
			setActiveProperties({...activeProperties, subregions: temp})
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
	const [AddSubregion] 			= useMutation(mutations.ADD_SUBREGION, mutationOptions);


	
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

	const addItem = async () => {
		const newItem = {
			_id: '',
			owner: props.user._id,
			root: false,
			name: 'Unknown',
			capital: 'Unknown',
			leader: 'Unknown',
			children: [],
			landmarks: [],
			sortRule: 'task',
			sortDirection: 1
		};
		let opcode = 1;
		let itemID = newItem._id;
		let listID = activeProperties._id;
		AddSubregion({variables: {subregion: newItem, _id: listID, index: -1}}) 

		// if(this.opcode !== 0) {
        //     this.item._id = this.itemID = data.addItem;
		// }
		// let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, AddTodoItem, DeleteTodoItem);
		// props.tps.addTransaction(transaction);
		// tpsRedo();
	};

	// const deleteItem = async (item, index) => {
	// 	let listID = activeList._id;
	// 	let itemID = item._id;
	// 	let opcode = 0;
	// 	let itemToDelete = {
	// 		_id: item._id,
	// 		description: item.description,
	// 		due_date: item.due_date,
	// 		assigned_to: item.assigned_to,
	// 		completed: item.completed
	// 	}
	// 	let transaction = new UpdateListItems_Transaction(listID, itemID, itemToDelete, opcode, AddTodoItem, DeleteTodoItem, index);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// };

	// const editItem = async (itemID, field, value, prev) => {
	// 	let flag = 0;
	// 	if (field === 'completed') flag = 1;
	// 	let listID = activeList._id;
	// 	let transaction = new EditItem_Transaction(listID, itemID, field, prev, value, flag, UpdateTodoItemField);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// };

	// const reorderItem = async (itemID, dir) => {
	// 	let listID = activeList._id;
	// 	let transaction = new ReorderItems_Transaction(listID, itemID, dir, ReorderTodoItems);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// };

	// const handleSetActive = (_id) => {
	// 	const selectedList = todolists.find(todo => todo._id === _id);
	// 	loadTodoList(selectedList);
	// };

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

	// const sort = (criteria) => {
	// 	let prevSortRule = sortRule;
	// 	setSortRule(criteria);
	// 	let transaction = new SortItems_Transaction(activeList._id, criteria, prevSortRule, sortTodoItems);
	// 	console.log(transaction)
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();
		
	// }

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
									addItem={addItem} 
									activeProperties={activeProperties}
									history={props.history}
									path={props.location.pathname}
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