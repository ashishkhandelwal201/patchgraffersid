// require mongoose
import { mongoose  } from '../utils/import.js'

const userSchema = mongoose.Schema({

    _id : Number,
    name : {
        type : String,
        required : [true,"Name is required"],
        
        trim : true
    },
    username : {
        type : String,
        required : [true,"User Name is required"],
        
        trim : true
    },
    password : {
        type : String,
        required : [true , "Password is required"],
        trim : true
    },
  
    role : {
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


const userSchemaModel = mongoose.model('user_tmp',userSchema,"user")


// now we have to export this instance to modal so through the modal it save the data inside the DB with this above configurations
export default userSchemaModel;