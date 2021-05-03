import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import CreateAccount 					from '../modals/CreateAccount';
import Navbar 							from '../navbar/Navbar';
import * as mutations 					from '../../cache/mutations';
import MapList							from '../homescreen/MapList';
import { GET_DB_MAPS } 					from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WSidebar, WButton} 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WLFooter } from 'wt-frontend';
import { WCard, WCMedia, WCContent } 	from 'wt-frontend';
import globe from '../../imgs/world.png';

const Homescreen = (props) => {
	const auth = props.user === null ? false : true;
	let mapData = [];
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [listToDelete, setListToDelete]	= useState(null);

	const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		for(let todo of data.getAllMaps.filter(region => region.root)) {
			mapData.push({_id: todo._id, name: todo.name});
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
				<Navbar 
					fetchUser={props.fetchUser} 	auth={auth} 
					setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
					reloadTodos={refetch}			history={props.history}
					user={props.user}/>
			</WLHeader>

			<WLMain>
				{
					auth ?
					<WCard className="homescreen">
						<WLayout className="homescreen-layout" wLayout="header-lside">
							<WLHeader className="text-container white-text-red-header">Your Maps</WLHeader>
							<WLSide side="left">
								<WSidebar className="homescreen-leftsidebar">
									<MapList
										listIDs={mapData} 				
										setShowDelete={getDeleteListID}
										updateListField={updateListField}
										history={props.history}
									/>
								</WSidebar>
							</WLSide>
							<WLMain>
								<WLayout className="homescreen-right-layout" wLayout="footer">
									<WLMain>
										<img src={globe} alt="Globe"/>
									</WLMain>
									<WLFooter className="text-container white-text-red-header">
										<WButton className="create-map-button" onClick={createNewMap} wType="texted" hoverAnimation="text-primary">
        									Create New Map
        								</WButton>
									</WLFooter>
								</WLayout>
							</WLMain>
						</WLayout> 
					</WCard> :
					<WCard className="welcome-screen" wLayout="media-content">
						<WCMedia><img src={globe} alt="Globe"/></WCMedia>
						<WCContent className="welcome-text text-container">Welcome To The World Data Mapper</WCContent>
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
				showLogin && (<Login fetchUser={props.fetchUser} reloadTodos={refetch} setShowLogin={setShowLogin} />)
			}
		</WLayout>
	);
};

export default Homescreen;