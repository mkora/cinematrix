import mongoose, { Schema } from 'mongoose';

const CastedSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  person: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

CastedSchema.statics.truncate = async function () {
  const res = await this.remove({}).exec();
  return res;
};

export default mongoose.model('Casted', CastedSchema);
