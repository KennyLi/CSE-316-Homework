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

export const UPDATE = gql`
	mutation Update($email: String!, $password: String!, $firstName: String!, $lastName: String!, $sameEmail: Boolean!) {
		update(email: $email, password: $password, firstName: $firstName, lastName: $lastName, sameEmail: $sameEmail) {
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
	mutation AddSubregion($subregion: RegionInput!, $_id: String!, $index: Int!) {
		addSubregion(subregion: $subregion, id: $_id, index: $index)
	}
`;

export const DELETE_SUBREGION = gql`
	mutation DeleteSubregion($parentId: String!, $_id: String!) {
		deleteSubregion(parentId: $parentId, _id: $_id)
	}
`;

export const UPDATE_SUBREGION_FIELD = gql`
	mutation UpdateSubregionField($_id: String!, $field: String!, $value: String!) {
		updateSubregionField(_id: $_id, field: $field, value: $value)
	}
`;

export const SORT_SUBREGION = gql`
	mutation SortSubregion($_id: String!, $criteria: String!) {
		sortSubregion(_id: $_id, criteria: $criteria)
	}
`;

export const ADD_MAP = gql`
	mutation AddMap($map: RegionInput!) {
		addMap(map: $map)
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

export const UPDATE_PARENT = gql`
	mutation UpdateParent($_id: String!, $prev: String!, $update: String!) {
		updateParent(_id: $_id, prev: $prev, update: $update)
	}
`;