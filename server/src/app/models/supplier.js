const mongoose = require('mongoose');
const renameIdPlugin = require('mongoose-rename-id');
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
  name: { type: String, required: true, unique: true },
  contacts: [{ type: String }],
  tags: [{ type: String }],
  materials: [{ type: Schema.Types.ObjectId, ref: 'Material' }]
});

SupplierSchema.plugin(renameIdPlugin({ newIdName: 'id' }));

module.exports = mongoose.model('Supplier', SupplierSchema);
