const { model, Schema, ObjectId } = require('mongoose');

const landmarkSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		parent_id: {
			type: String,
			required: true
		},
		parent: {
			type: String,
			required: true
		}
	}
);

const Landmark = model('Landmark', landmarkSchema);
module.exports = Landmark;