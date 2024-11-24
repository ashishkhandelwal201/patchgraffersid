import { mongoose } from '../utils/import.js'


const url = "mongodb://localhost:27017/graffersid";
mongoose.connect(url);
console.log("Successfully connected to mongodb database....");