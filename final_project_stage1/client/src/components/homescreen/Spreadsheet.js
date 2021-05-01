import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import MainContents 					from '../main/MainContents';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import * as mutations 					from '../../cache/mutations';
import { GET_DB_MAPS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain} from 'wt-frontend';
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
				console.log(temp)
				console.log(path[i + 1])
				console.log(!(temp.includes(path[i + 1])))
				if (!(temp.includes(path[i + 1]))) {
					valid = false;
					break
				}
			}
			if (valid) {
				let activeRegion = maps.find(map => map._id === path[path.length - 1])
				if (activeRegion) {
					let temp = []
					for(let subregion of activeRegion.children) {
						temp.push(maps.find(map => map._id === subregion))
					}
					setSubregionList(temp)
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
			name: 'No Description',
			capital: 'No Date',
			leader: 'No One',
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
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
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
				{
					activeProperties._id ? 
							<div className="container">
								<MainContents
									addItem={addItem} 
									subregionList={subregionList}
									activeProperties={activeProperties}
									history={props.history}
									path={props.location.pathname}
								/>
							</div>
						:
							<div className="container" />
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
        </WLayout>
	);
};

export default Spreadsheet;