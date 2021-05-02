const { gql } = require('apollo-server');


const typeDefs = gql `
	type Region {
		_id: String!
		owner: String!
		root: Boolean!
		name: String!
		capital: String!
		leader: String!
		children: [String]
		landmarks: [Landmark]
		sortRule: String!
		sortDirection: Int!
	}
    type Landmark {
        _id: String!
        name: String!
        parent: String!
    }
	extend type Query {
		getAllMaps: [Region]
	}
	extend type Mutation {
		addSubregion(subregion: RegionInput!, id: String!, index: Int!): String
		addMap(map: RegionInput!): String
		deleteMap(_id: String!): Boolean
		updateMapField(_id: String!, field: String!, value: String!): String
	}
	input RegionInput {
		_id: String
		owner: String
		root: Boolean
		name: String
		capital: String
		leader: String
		children: [String]
		landmarks: [LandmarkInput]
		sortRule: String
		sortDirection: Int
	}
    input LandmarkInput {
        _id: String
        name: String
        parent: String
    }
`;

module.exports = { typeDefs: typeDefs }