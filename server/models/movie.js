import mongoose, { Schema } from 'mongoose';
// eslint-disable-next-line no-unused-vars
import Person from './person';

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
    min: 1900,
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
  directed: [{
    type: Schema.Types.ObjectId,
    ref: 'Person',
  }],
  casted: [{
    type: Schema.Types.ObjectId,
    ref: 'Person',
  }],
});

MovieSchema.statics.findOneByTitle = async function (title) {
  const res = await this.findOne({ title: new RegExp(`^${title}$`, 'i') });
  return res;
};

MovieSchema.statics.truncate = async function () {
  const res = await this.remove({}).exec();
  return res;
};

export default mongoose.model('Movie', MovieSchema);
