const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');
const Sorting = require('../utils/sorting')

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of todolist objects on success, and an empty array on failure
		**/
		getAllMaps: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const maps = await Region.find({owner: _id}).sort({updatedAt: 'descending'});
			if(maps) {
				return (maps);
			} 
		}
	},
	Mutation: {
		/** 
		 	@param 	 {object} args - a todolist id and an empty item object
			@returns {string} the objectID of the item or an error message
		**/
		addSubregion: async(_, args) => {
			const { id, subregion, index } = args;
			const MapId = new ObjectId(id);
			let subregionId = new ObjectId();
			const {_id, owner, root, name, capital, leader, children, landmarks, sortRule, sortDirection} = subregion;
			if (_id !== '') {
				subregionId = _id 
			}
			const newMap = new Region({
				_id: subregionId,
				owner: owner,
				root: root,
				name: name,
				capital: capital,
				leader: leader,
				children: children,
				landmarks: landmarks,
				sortRule: sortRule,
				sortDirection: sortDirection,
			});
			const map = await newMap.save();
			const found = await Region.findOne({_id: MapId});
			if(!found) return ('Map not found');
			let subregionList = found.children;
			if(index < 0) subregionList.push(subregionId);
			else subregionList.splice(index, 0, subregionId);
			
	
			const updated = await Region.updateOne({_id: MapId}, {children: subregionList});
			if(updated) return subregionId
			else return ('Could not add subregion');
		},
		/** 
		 	@param 	 {object} args - an empty todolist object
			@returns {string} the objectID of the todolist or an error message
		**/
		addMap: async (_, args) => {
			const { map } = args;
			let objectId = new ObjectId();
			const {_id, owner, root, name, capital, leader, children, landmarks, sortRule, sortDirection} = map;
			if (_id !== '') {
				objectId = _id 
			}
			const newMap = new Region({
				_id: objectId,
				owner: owner,
				root: root,
				name: name,
				capital: capital,
				leader: leader,
				children: children,
				landmarks: landmarks,
				sortRule: sortRule,
				sortDirection: sortDirection,
			});
			const updated = await newMap.save();
			if(updated) {
				return objectId;
			}
		},
		/** 
		 	@param 	 {object} args - a todolist objectID 
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteMap: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
		/** 
		 	@param 	 {object} args - a todolist objectID, field, and the update value
			@returns {boolean} true on successful update, false on failure
		**/
		updateMapField: async (_, args) => {
			const { field, value, _id } = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objectId}, {[field]: value});
			if(updated) return value;
			else return "";
		}
	}
}