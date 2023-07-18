const {model, Schema } = require('mongoose');

const recipeSchema = new Schema({
    title: String,
    author: String,
})
module.exports = model('Recipe',recipeSchema);