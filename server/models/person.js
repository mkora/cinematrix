import mongoose, { Schema } from 'mongoose';
// eslint-disable-next-line no-unused-vars
import Movie from './movie';

const PersonSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    min: 2,
    max: 100,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    min: 2,
    max: 100,
    trim: true,
  },
  birthday: {
    type: Date,
  },
  birthplace: {
    type: String,
    trim: true,
    min: 2,
    max: 500,
  },
  deathday: {
    type: Date,
    default: null,
  },
  pic: {
    type: Buffer,
  },
  source: {
    type: String,
  },
  directed: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie',
  }],
  casted: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie',
  }],
});

PersonSchema
  .virtual('name')
  .get(function () {
    return `${this.firstname} ${this.lastname}`;
  });

PersonSchema.statics.findOneByName = async function (name) {
  const [firstname, lastname] = [...name.split(' ')];
  const res = await this.findOne({
    firstname: new RegExp(firstname, 'i'),
    lastname: new RegExp(lastname, 'i'),
  });
  return res;
};

PersonSchema.statics.truncate = async function () {
  const res = await this.remove({}).exec();
  return res;
};

export default mongoose.model('Person', PersonSchema);
