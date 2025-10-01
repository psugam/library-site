const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    name: {
        type:String,
        required: true
    },
    authors: {
        type:[String],
        required:true
        },
    editors:{
        type:[String],
        required:false
    },
    publisher:{
        type:[String],
        required:false
        },
    languages:{
        type:[String],
        required:true
        },
    published_date: Date,
    cover_images: {
        type:[String],
        required:false
        },
    price: {
        type:Number,
        required:false
        },
    pages:{
        type: Number,
        required : true
        },
    genres: {
        type:[String],
        required:false
        },
    read_status: {
        type: String, 
        enum: ['Read', 'Unread', 'Reading', 'Half-read'],
        required: true, 
        default: 'Unread'
    },
    summary:{
        type: String, 
        required: false
    },
    my_note:{
        type: String,
        required: false
    }, 
    rating: {
        type: Number,
        required: false,
        min : 0,
        max: 5
    }, 
    read_date:{
        type:[Date], 
        required: false
    },
    lent_to:{
        type: String, 
        required: false
    }
  },
  {
    timeStamps: true,
  }
);


const Book =mongoose.model('book', bookSchema);
module.exports=Book