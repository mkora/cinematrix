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

export default mongoose.model('Casted', CastedSchema);
