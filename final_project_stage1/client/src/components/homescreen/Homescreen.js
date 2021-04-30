import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import * as mutations 					from '../../cache/mutations';
import SidebarList						from '../sidebar/SidebarList';
import SidebarHeader					from '../sidebar/SidebarHeader';
import { GET_DB_MAPS } 				from '../../cache/queries';
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

	const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		for(let todo of data.getAllMaps.filter(region => region.root)) {
			SidebarData.push({_id: todo._id, name: todo.name});
		}
	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAPS }], 
		awaitRefetchQueries: true,
	}

	const [UpdateMapField] 	= useMutation(mutations.UPDATE_MAP_FIELD, mutationOptions);
	const [AddMap] 			= useMutation(mutations.ADD_MAP, mutationOptions);
	const [DeleteMap] 		= useMutation(mutations.DELETE_MAP, mutationOptions);

	const createNewMap = async () => {
		let map = {
			_id: '',
			owner: props.user._id,
			root: true,
			name: 'Untitled',
			capital: 'none',
			leader: 'none',
			children: [],
			landmarks: [],
			sortRule: 'task',
			sortDirection: 1
		};
		const { data } = await AddMap({ variables: { map: map }});
	};

	const deleteList = async (_id) => {
		DeleteMap({ variables: { _id: _id }});
	};

	const updateListField = async (_id, field, value, prev) => {
		UpdateMapField({ variables: { _id: _id, field: field, value: value }});
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
							<Logo history={props.history}/>
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} 	auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							reloadTodos={refetch}			history={props.history}
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
												history={props.history}
										/>
									</WSidebar>
								</WLSide>
								<WLMain>
									<WLayout wLayout="footer">
										<WLMain></WLMain>
										<WLFooter>
											<SidebarHeader createNewList={createNewMap}/>
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