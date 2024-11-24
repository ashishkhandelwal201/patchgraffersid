import { mongoose  } from '../utils/import.js'


const reviewSchema = mongoose.Schema({

    _id : Number,
    fullname : {
        type : String,
        required : [true , "name is required"],
        lowercase : true,
        trim:true
    },
    company_id :{
        type : Number,
        required : [true , "company id is required"],
        trim : true
    },
    subject:{
        type : String,
        required : [true , "subject is required"],
        trim : true
    },
    reviewtext:{
        type : String,
        required : [true , "reviewtext is required"],
        trim : true
    },
    ratings : {
        type : Number,
        trim : true
    },
    isdeleted : {
        type : Number,
        trim : true
    },
    info : {
        type : Date,
        required : true,
        trim : true
    }

})







const reviewSchemaModel = mongoose.model('reviews_tmp',reviewSchema,"review")
export default reviewSchemaModel;


// fullname
// subject
// reviewtext
// ratings