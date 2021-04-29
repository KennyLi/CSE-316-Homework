import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			firstName
			lastName
			password
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
		register(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
			email
			password
			firstName
			lastName
		}
	}
`;
export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const ADD_SUBREGION = gql`
	mutation AddSubregion($subregion: SubregionInput!, $_id: String, $index: Int!) {
		addSubregion(subregion: $subregion, _id: $_id, index: $index)
	}
`;

export const ADD_MAP = gql`
	mutation AddMap($map: MapInput!) {
		addMap(map: $map) {
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

export const DELETE_MAP = gql`
	mutation DeleteMap($_id: String!) {
		deleteMap(_id: $_id)
	}
`;

export const UPDATE_MAP_FIELD = gql`
	mutation UpdateMapField($_id: String!, $field: String!, $value: String!) {
		updateMapField(_id: $_id, field: $field, value: $value)
	}
`;
