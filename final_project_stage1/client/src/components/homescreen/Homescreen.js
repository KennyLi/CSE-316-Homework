import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import * as mutations 					from '../../cache/mutations';
import SidebarList						from '../sidebar/SidebarList';
import SidebarHeader					from '../sidebar/SidebarHeader';
import { GET_DB_TODOS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WLFooter } from 'wt-frontend';
import { WCard, WCMedia, WCContent } 	from 'wt-frontend';

const Homescreen = (props) => {
	const auth = props.user === null ? false : true;
	let SidebarData = [];
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [listToDelete, setListToDelete]	= useState(null);

	const { loading, error, data, refetch } = useQuery(GET_DB_TODOS);

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		for(let todo of data.getAllTodos) {
			if(todo) {
				SidebarData.push({_id: todo._id, name: todo.name});
			}
		}
	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_TODOS }], 
		awaitRefetchQueries: true,
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
	};

	const deleteList = async (_id) => {
		DeleteTodolist({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_TODOS }] });
	};

	const updateListField = async (_id, field, value, prev) => {
		UpdateTodolistField({ variables: { _id: _id, field: field, value: value }, refetchQueries: [{ query: GET_DB_TODOS }] });
	};

	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	const setShowDelete = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(!showDelete)
	};
	
	const getDeleteListID = (_id) => {
		setListToDelete(_id);
		setShowDelete();
	}

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
										<SidebarList
												listIDs={SidebarData} 				
												setShowDelete={getDeleteListID}
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
				showDelete && (<Delete deleteList={deleteList} _id={listToDelete} setShowDelete={setShowDelete} />)
			}   			
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