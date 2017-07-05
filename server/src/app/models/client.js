const mongoose = require('mongoose');
const renameIdPlugin = require('mongoose-rename-id');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: { type: String, required: true, unique: true },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  tags: [{ type: String }]
});

ClientSchema.plugin(renameIdPlugin({ newIdName: 'id' }));

module.exports = mongoose.model('Client', ClientSchema);
