import mongoose from 'mongoose';

export const imgSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model('Image', imgSchema);

export default Image;
