import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import * as mutations 					from '../../cache/mutations';
import SidebarContents 					from '../sidebar/SidebarContents';
import SidebarHeader					from '../sidebar/SidebarHeader';
import { GET_DB_TODOS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WLFooter } from 'wt-frontend';
import { WCard, WCMedia, WCContent } 	from 'wt-frontend';

const Homescreen = (props) => {
	const auth = props.user === null ? false : true;
	let todolists 	= [];
	let SidebarData = [];
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);

	const { loading, error, data, refetch } = useQuery(GET_DB_TODOS);

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		// Assign todolists 
		for(let todo of data.getAllTodos) {
			todolists.push(todo)
		}
		// if a list is selected, shift it to front of todolists
		// if(activeList._id) {
		// 	let selectedListIndex = todolists.findIndex(entry => entry._id === activeList._id);
		// 	let removed = todolists.splice(selectedListIndex, 1);
		// 	todolists.unshift(removed[0]);
		// }
		// create data for sidebar links
		for(let todo of todolists) {
			if(todo) {
				SidebarData.push({_id: todo._id, name: todo.name});
			}	
		}
	}
	
	// NOTE: might not need to be async
	// const reloadList = async () => {
	// 	if (activeList._id) {
	// 		let tempID = activeList._id;
	// 		let list = todolists.find(list => list._id === tempID);
	// 		setActiveList(list);
	// 	}
	// }

	// const loadTodoList = (list) => {
	// 	setActiveList(list);
	// }

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_TODOS }], 
		awaitRefetchQueries: true,
		// onCompleted: () => reloadList()
	}

	const [UpdateTodolistField] 	= useMutation(mutations.UPDATE_TODOLIST_FIELD, mutationOptions);
	const [AddTodolist] 			= useMutation(mutations.ADD_TODOLIST);
	const [DeleteTodolist] 			= useMutation(mutations.DELETE_TODOLIST);

	const createNewList = async () => {
		let list = {
			_id: '',
			name: 'Untitled',
			owner: props.user._id,
			items: [],
			sortRule: 'task',
			sortDirection: 1
		}
		const { data } = await AddTodolist({ variables: { todolist: list }, refetchQueries: [{ query: GET_DB_TODOS }] });
		// if(data) {
		// 	loadTodoList(data.addTodolist);
		// } 
		
	};
	const deleteList = async (_id) => {
		DeleteTodolist({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_TODOS }] });
		// loadTodoList({});
	};

	const updateListField = async (_id, field, value, prev) => {
		UpdateTodolistField({ variables: { _id: _id, field: field, value: value }, refetchQueries: [{ query: GET_DB_TODOS }] });
	};

	const handleSetActive = (_id) => {
		// const selectedList = todolists.find(todo => todo._id === _id);
		// loadTodoList(selectedList);
	};

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
							<Logo/>
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} 	auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							reloadTodos={refetch}
							user={props.user}
						/>
					</ul>
				</WNavbar>
			</WLHeader>

			<WLMain>
				{
					auth ?
					<WCard>
						<WLayout wLayout="header-lside">
							<WLHeader><div className="container-secondary">Your Maps</div></WLHeader>
								<WLSide side="left">
									<WSidebar>
										<SidebarContents
												listIDs={SidebarData} 				
												handleSetActive={handleSetActive}	deleteList={deleteList}
												updateListField={updateListField}
										/>
									</WSidebar>
								</WLSide>
								<WLMain>
									<WLayout wLayout="footer">
										<WLMain></WLMain>
										<WLFooter>
											<SidebarHeader createNewList={createNewList}/>
										</WLFooter>
									</WLayout>
								</WLMain>
							</WLayout> 
						</WCard> :
					<WCard wLayout="media-content">
						<WCMedia></WCMedia>
						<WCContent><div className="container-secondary">Welcome To The World Data Mapper</div></WCContent>
					</WCard>
				}
			</WLMain>
			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} reloadTodos={refetch}setShowLogin={setShowLogin} />)
			}
		</WLayout>
	);
};

export default Homescreen;