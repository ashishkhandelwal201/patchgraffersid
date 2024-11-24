import "../config/database.js"
import reviewSchemaModel from '../schema/review.schema.js'

class IndexModel{
    async fetchReviewsById(condition_obj={}){
        const result = await reviewSchemaModel.find(condition_obj)
        return result


    }
    
    
    async addReviews(reviews_data){
        const savedObj = new reviewSchemaModel(reviews_data)
        const reviewAddAck = await savedObj.save()
        return reviewAddAck
    }
}
    
export default new IndexModel