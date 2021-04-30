import React 			from 'react';
import Homescreen 		from './components/homescreen/Homescreen';
import Spreadsheet 		from './components/homescreen/Spreadsheet';
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

 
const App = () => {
	let user = null;
    let transactionStack = new jsTPS();
	let refreshTps = false;
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }
	return(
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to={ {pathname: "/home"} } />
				<Redirect exact from="/spreadsheet" to={ {pathname: "/home"} } />
				<Route 
					path="/home" 
					name="home" 
					render={({ location, history }) => 
						<Homescreen fetchUser={refetch} user={user} location={location} history={history}/>
					} 
				/>
				
				<Route 
					path="/spreadsheet/:id" 
					name="spreadsheet" 
					render={({ location, history }) => 
						<Spreadsheet tps={transactionStack} fetchUser={refetch} user={user} location={location} history={history} key={Date.now()}/>
					} 
				/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;