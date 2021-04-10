const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const mongoUri = 'mongodb://localhost/backpack';//might have to change localhost when we deploy
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const UserSchema = new Schema({
  id: {type: Number, required: true },
  name: {type: String},
  email: {type: String}
});

const CouchSchema = new Schema({
  userId: {type: Number, required: true},
  name: {type: String},
  phone: {type: String},
  address: {type: String},
  lat: {type: Number},
  long: {type: Number},
});

module.exports = {
  Users: model('Users', UserSchema),
  Couches: model('Couches', CouchSchema),
};
