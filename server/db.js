const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const mongoUri = 'mongodb://localhost/backpack';
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

});

module.exports = {
  Users: model('Users', UserSchema),
  Couches: model('Couches', CouchSchema),
};
