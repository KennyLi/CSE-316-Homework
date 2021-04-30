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
		parent: {
			type: ObjectId,
			required: true
		}
	}
);

const Landmark = model('Landmark', landmarkSchema);
module.exports = Landmark;