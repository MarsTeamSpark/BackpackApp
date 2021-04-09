const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const mongoUri = 'mongodb://localhost/backpack';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const UserSchema = new Schema({

});

const CouchSchema = new Schema({

});

module.exports = {
  Users: model('Users', UserSchema),
  Couches: model('Couches', CouchSchema),
};
