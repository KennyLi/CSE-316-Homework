const { gql } = require('apollo-server');


const typeDefs = gql `
	type Region {
		_id: String!
		owner: String!
		root: Boolean!
		name: String!
		capital: String!
		leader: String!
		parent: String!
		children: [String]
		landmarks: [Landmark]
		sortRule: String!
		sortDirection: Int!
	}
    type Landmark {
        _id: String!
        name: String!
		parent_id: String!
        parent: String!
    }
	extend type Query {
		getAllMaps: [Region]
	}
	extend type Mutation {
		addSubregion(subregion: RegionInput!, id: String!, index: Int!): String
		deleteSubregion(parentId: String!, _id: String!): [String]
		updateSubregionField(_id: String!, field: String!, value: String!): Boolean
		sortSubregion(_id: String!, criteria: String!): [String]
		addMap(map: RegionInput!): String
		deleteMap(_id: String!): Boolean
		updateMapField(_id: String!, field: String!, value: String!): String
		updateParent(_id: String!, prev: String!, update: String!): String
		addLandmark(landmark: LandmarkInput!, _id: String!, index: Int!): String
		deleteLandmark(parentId: String!, _id: String!): [Landmark]
	}
	input RegionInput {
		_id: String
		owner: String
		root: Boolean
		name: String
		capital: String
		leader: String
		parent: String
		children: [String]
		landmarks: [LandmarkInput]
		sortRule: String
		sortDirection: Int
	}
    input LandmarkInput {
        _id: String
        name: String
		parent_id: String
        parent: String
    }
`;

module.exports = { typeDefs: typeDefs }