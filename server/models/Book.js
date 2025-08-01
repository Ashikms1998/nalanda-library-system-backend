import mongoose from 'mongoose';

const bookSchema =new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'Please add an author'],
        trim: true,
    },

    ISBN: {
        type: String,
        required: [true, 'Please add an ISBN'],
        unique: true,
        trim: true
    },
    publicationDate: {
        type: Date,
        required: [true, 'Please add a publication date']
    },
    genre: {
        type: String,
        required: [true, 'Please add a genre'],
        trim: true
    },
    copies: {
        type: Number,
        required: [true, 'Please add number of copies'],
        min: [0, 'Copies cannot be negative'],
        default: 1
    },
    availableCopies: {
        type: Number,
        default: function() { return this.copies; }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;