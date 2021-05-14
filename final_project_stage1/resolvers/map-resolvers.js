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
			const {_id, owner, root, name, capital, leader, parent, children, landmarks, sortRule, sortDirection} = subregion;
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
				parent: parent,
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
		 	@param 	 {object} args - a todolist objectID and item objectID
			@returns {array} the updated item array on success or the initial 
							 array on failure
		**/
		deleteSubregion: async (_, args) => {
			const  { parentId, _id } = args;
			const listId = new ObjectId(parentId);
			const found = await Region.findOne({_id: parentId});
			let listItems = found.children;
			listItems = listItems.filter(subregionId => subregionId !== _id);
			const updated = await Region.updateOne({_id: listId}, { children: listItems })
			const deleted = await Region.deleteOne({_id: new ObjectId(_id)});
			if(updated) return (listItems);
			else return (found.children);
		},
		/** 
			@param	 {object} args - a todolist objectID, an item objectID, field, and
									 update value. Flag is used to interpret the completed 
									 field,as it uses a boolean instead of a string
			@returns {array} the updated item array on success, or the initial item array on failure
		**/
		updateSubregionField: async (_, args) => {
			const { _id, field, value } = args;
			const listId = new ObjectId(_id);
			let updated;
			if (field === "name") {
				const found = await Region.findOne({_id: listId});
				let landmarks = found.landmarks
				landmarks.map(landmark => {landmark.parent = value});
				updated = await Region.updateOne({_id: listId}, { [field]: value, landmarks: landmarks})
			} else {
				updated = await Region.updateOne({_id: listId}, { [field]: value })
			}
			if(updated) return (true);
			else return (false);
		},
		sortSubregion: async (_, args) => {
			const { _id, criteria, unsorted } = args;
			const listId = new ObjectId(_id);
			const found = await Region.findOne({_id: listId});
			let newDirection = found.sortDirection === 1 ? -1 : 1; 
			console.log(newDirection, found.sortDirection);
			let sortedSubregions = await Region.find({parent: _id})

			switch(criteria) {
				case 'name':
					sortedSubregions = Sorting.byName(sortedSubregions, newDirection);
					sortedSubregions = sortedSubregions.map(subregion => subregion._id)
					break;
				case 'capital':
					sortedSubregions = Sorting.byCapital(sortedSubregions, newDirection);
					sortedSubregions = sortedSubregions.map(subregion => subregion._id)
					break;
				case 'leader':
					sortedSubregions = Sorting.byLeader(sortedSubregions, newDirection);
					sortedSubregions = sortedSubregions.map(subregion => subregion._id)
					break;
				default:
					sortedSubregions = unsorted
					break;
			}
			console.log(sortedSubregions)
			const updated = await Region.updateOne({_id: listId}, { children: sortedSubregions, sortRule: criteria, sortDirection: newDirection })
			if(updated) return (sortedSubregions);
		},
		/** 
		 	@param 	 {object} args - an empty todolist object
			@returns {string} the objectID of the todolist or an error message
		**/
		addMap: async (_, args) => {
			const { map } = args;
			let objectId = new ObjectId();
			const {_id, owner, root, name, capital, leader, parent, children, landmarks, sortRule, sortDirection} = map;
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
				parent: parent,
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
		},
		updateParent: async (_, args) => {
			const { _id, prev, update } = args;
			const listId = new ObjectId(_id);
			const prevId = new ObjectId(prev);
			const nextId = new ObjectId(update);
			const updated = await Region.updateOne({_id: listId}, { parent: update })
			let prevParent = await Region.findOne({_id: prevId});
			prevParent = prevParent.children
			prevParent = prevParent.filter(child => child !== _id);
			const updatedPrev = await Region.updateOne({_id: prevId}, { children: prevParent })
			let nextParent = await Region.findOne({_id: nextId})
			nextParent = nextParent.children
			nextParent.push(_id)
			const updatedNext = await Region.updateOne({_id: nextId}, { children: nextParent })
			if(updated) return (update);
			else return (prev);
		},
		addLandmark: async(_, args) => {
			const { _id, landmark , index } = args;
			const mapId = new ObjectId(_id);
			const objectId = new ObjectId();
			const found = await Region.findOne({_id: mapId});
			if(!found) return ('Region not found');
			if(landmark._id === '') landmark._id = objectId;
			let landmarkList = found.landmarks;
			if(index < 0) landmarkList.push(landmark);
			else landmarkList.splice(index, 0, landmark);
			const updated = await Region.updateOne({_id: mapId}, { landmarks: landmarkList });

			if(updated) return (landmark._id)
			else return ('Could not add item');
		},
		deleteLandmark: async (_, args) => {
			const  { parentId, _id } = args;
			const mapId = new ObjectId(parentId);
			const found = await Region.findOne({_id: mapId});
			let landmarkList = found.landmarks;
			landmarkList = landmarkList.filter(landmark => landmark._id.toString() !== _id);
			const updated = await Region.updateOne({_id: mapId}, { landmarks: landmarkList })
			if(updated) return (landmarkList);
			else return (found.landmarks);
		},
		updateLandmarkField: async (_, args) => {
			const { parentId, _id, value } = args;
			const mapId = new ObjectId(parentId);
			const found = await Region.findOne({_id: mapId});
			let landmarkList = found.landmarks;
			landmarkList.map(landmark => {
				if(landmark._id.toString() === _id) {
					landmark.name = value;
				}
			});
			const updated = await Region.updateOne({_id: mapId}, { landmarks: landmarkList })
			if(updated) return (landmarkList);
			else return (found.landmarks);
		},
	}
}