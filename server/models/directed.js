import mongoose, { Schema } from 'mongoose';

const DirectedSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  person: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

DirectedSchema.statics.truncate = async function () {
  const res = await this.remove({}).exec();
  return res;
};

export default mongoose.model('Directed', DirectedSchema);
