import "../config/database.js"
import companySchemaModel from '../schema/company.schema.js'

import reviewSchemaModel from '../schema/review.schema.js'
class IndexModel{
    async fetchCompanies(condition_obj={}){ // using default params of ES6
        const result = await companySchemaModel.find(condition_obj)
        return result


    }
    
    
    async addCompany(company_data){
        const savedObj = new companySchemaModel(company_data)
        const companyAddAck = savedObj.save()
        return companyAddAck
    }

    async fetchRatings(company_id){
        const ratings = await reviewSchemaModel.find()
        return ratings
    }
}
    
export default new IndexModel