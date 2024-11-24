import { mongoose  } from '../utils/import.js'


const companySchema = mongoose.Schema({

    _id : Number,
    companyname : {
        type : String,
        required : [true , "Company name is required"],
        lowercase : true,
        trim:true
    },
    location:{
        type : String,
        required : [true , "Company location is required"],
        trim : true
    },
    city:{
        type : String,
        required : [true , "City is required"],
        trim : true
    },
    logo : {
        type : String,
        trim : true
    },
    foundedon : {
        type : String,
        required : true,
        trim : true,
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







const companySchemaModel = mongoose.model('company_tmp',companySchema,"company")
export default companySchemaModel;
// id
// companyname 
// location 
// city
// logo
// foundedon
// isdeleted
// info