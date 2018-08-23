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

export default mongoose.model('Directed', DirectedSchema);
