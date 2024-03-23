const mongoose = require('mongoose');

const TranslationSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: Map, of: String }, // A map where the key is the language code and the value is the translation
  namespace: { type: String, required: true }, // Optional, if you want to group translations
});

module.exports = mongoose.model('Translation', TranslationSchema);
