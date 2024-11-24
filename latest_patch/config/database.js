import { mongoose , env } from '../utils/import.js'
env.config()

console.log(process.env.host)
const url = `mongodb://${process.env.host}:${process.env.mongo_PORT}/${process.env.db}`;
mongoose.connect(url);
console.log("Successfully connected to mongodb database....");