const mongoose = require('mongoose');
const renameIdPlugin = require('mongoose-rename-id');
const Schema = mongoose.Schema;

const MeterialSchema = new Schema({
  name: { type: String, required: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
  description: { type: String },
  metric: { type: String },
  price: { type: Number, default: 0 },
  available: { type: Number, default: 0 },
  tags: [{ type: String }]
});

MeterialSchema.plugin(renameIdPlugin({ newIdName: 'id' }));

module.exports = mongoose.model('Meterial', MeterialSchema);
