const { model, Schema, ObjectId } = require('mongoose');
const Landmark = require('./landmark-model').schema;

const subregionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		capital: {
			type: String,
			required: true
		},
		leader: {
			type: String,
			required: true
		},
        landmarks: [Landmark]
	}
);
subregionSchema.add({ subregions: [subregionSchema]})

const Subregion = model('Subregion', subregionSchema);
module.exports = Subregion;