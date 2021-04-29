const { gql } = require('apollo-server');


const typeDefs = gql `
	type Map {
		_id: String!
		name: String!
		owner: String!
		subregions: [Subregion]
		sortRule: String!
		sortDirection: Int!
	}
	type Subregion {
		_id: String!
		name: String!
	    capital: String!
		leader: String!
        subregions: [Subregion]
		landmarks: [Landmark]
	}
    type Landmark {
        _id: String!
        name: String!
        subregion: String!
    }
	extend type Query {
		getAllMaps: [Map]
	}
	extend type Mutation {
		addSubregion(subregion: SubregionInput!, _id: String, index: Int!): String
		addMap(map: MapInput!): Map		
		deleteMap(_id: String!): Boolean
		updateMapField(_id: String!, field: String!, value: String!): String
	}
	input MapInput {
		_id: String
		name: String
		owner: String
		subregions: [SubregionInput]
		sortRule: String
		sortDirection: Int
	}
	input SubregionInput {
		_id: String
		name: String
		capital: String
		leader: String
		subregions: [SubregionInput]
        landmarks: [LandmarkInput]
	}
    input LandmarkInput {
        _id: String
        name: String
        subregion: String
    }
`;

module.exports = { typeDefs: typeDefs }