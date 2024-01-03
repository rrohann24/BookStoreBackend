const mongoose = require('mongoose');

const bookstoreSchema = mongoose.Schema(
    {
    title :{
        type: String,
        required: true,
    },
    author :{
        type: String,
        required: true,
    },
    publishYear :{
        type: Number,
        required: true,
    },
},
{
    timestamps: true
}
);

const Book = mongoose.model('Book', bookstoreSchema);
module.exports = Book;