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
			owner
			root
			name
			capital
			leader
			parent
			children
			landmarks {
				_id
				name
				parent_id
				parent
			}
			sortRule
			sortDirection
		}
	}
`;
