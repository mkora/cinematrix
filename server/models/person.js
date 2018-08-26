import mongoose, { Schema } from 'mongoose';

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
});

PersonSchema
  .virtual('name')
  .get(() => `${this.firstname} ${this.lastname}`);

// eslint-disable-next-line func-names
PersonSchema.statics.findOneByName = async function (name) {
  const [firstname, lastname] = [...name.split(' ')];
  const res = await this.findOne({
    firstname: new RegExp(firstname, 'i'),
    lastname: new RegExp(lastname, 'i'),
  });
  return res;
};

export default mongoose.model('Person', PersonSchema);
