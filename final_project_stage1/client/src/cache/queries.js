import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			firstName
			lastName
			email
		}
	}
`;

export const GET_DB_MAPS = gql`
	query GetDBMaps {
		getAllMaps {
			_id
			name
			owner
			subregions {
				_id
				name
				capital
				leader
				subregions {
					_id
					name
					capital
					leader
					subregions {
						_id
						name
						capital
						leader
						landmarks {
							_id
							name
							subregion
						}
					}
					landmarks {
						_id
						name
						subregion
					}
				}
				landmarks {
					_id
					name
					subregion
				}
			}
			sortRule
			sortDirection
		}
	}
`;
