import mongoose from 'mongoose';

const BorrowingRecordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['borrowed', 'returned'],
        default: 'borrowed'
    },
});

const BorrowingRecord = mongoose.model('BorrowingRecord', BorrowingRecordSchema);

export default BorrowingRecord;