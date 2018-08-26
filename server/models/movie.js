import mongoose, { Schema } from 'mongoose';

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 2,
    max: 500,
    trim: true,
  },
  alsoknown: {
    type: String,
    min: 2,
    max: 500,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1920,
    max: 2500,
  },
  country: {
    type: String,
    required: true,
    min: 2,
    max: 500,
    trim: true,
  },
  duration: {
    type: Number, // min
    default: 0,
  },
  imdb: {
    type: Schema.Types.Decimal128,
    default: 0,
    min: 0,
    max: 10,
  },
  episodes: {
    type: Number,
    default: 1,
  },
  synopsis: {
    type: String,
  },
  pic: {
    type: Buffer,
  },
  source: {
    type: String,
  },
});

// eslint-disable-next-line func-names
MovieSchema.statics.findOneByTitle = async function (title) {
  const res = await this.findOne({ title: new RegExp(title, 'i') });
  return res;
};

export default mongoose.model('Movie', MovieSchema);
