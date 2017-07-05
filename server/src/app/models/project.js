const mongoose = require('mongoose');
const renameIdPlugin = require('mongoose-rename-id');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: { type: String, defalut: '' },
  cost: { type: Number, defalut: 0 },
  client: { type: Schema.Types.ObjectId, ref: 'Client' },
  description: { type: String },
  materials: [{
    quantity: { type: Number },
    material: { type: Schema.Types.ObjectId, ref: 'Material' }
  }],
  tags: [{ type: String }]
});

ProjectSchema.plugin(renameIdPlugin({ newIdName: 'id' }));

module.exports = mongoose.model('Project', ProjectSchema);
