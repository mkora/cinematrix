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
  bio: {
    type: String,
  },
  pic: {
    type: Buffer,
  },
});

PersonSchema
  .virtual('name')
  .get(() => `${this.firstname}, ${this.lastname}`);

export default mongoose.model('Person', PersonSchema);
