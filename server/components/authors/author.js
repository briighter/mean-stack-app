var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var authorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

// Virtual for author's full name
authorSchema
    .virtual('name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });

// Virtual for author's lifespan
authorSchema
    .virtual('lifespan')
    .get(function () {
        return (this.date_of_death.getFullYear() - this.date_of_birth.getFullYear()).toString();
    });

// Virtual for author's URL
authorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });

//Export model
module.exports = mongoose.model('Author', authorSchema);

