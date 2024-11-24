import { reviewsModel , logger , companiesModel } from '../utils/import.js'


class reviewsController{
        async getReviews(req,res){
            try{
                const company_id = req.params.company_id
                const companyDetails = await companiesModel.fetchCompanies({"_id":company_id})

                const reviewslist = await reviewsModel.fetchReviewsById({company_id , isdeleted : 0})
                let avgRatingSum = 0
                reviewslist.forEach(single => {
                    avgRatingSum+=single.ratings
                    // console.log(single.ratings)
                })
                const avgRating = avgRatingSum/reviewslist.length
                console.log(avgRating)
                return res.render("reviewslisting" , { reviewslist , avgRating ,  company_id , companyDetails })

            }catch(er){
                console.log(`error in companies.controller : ${er}`)
                logger.error(`error in companies.controller : ${er}`)
            }
        }

        async addReviews(req,res){
            try{

                const company_id = req.params.company_id
                const fullname = req.body.fullname ? req.body.fullname : ""
                const subject = req.body.subject ? req.body.subject : ""
                const reviewtext = req.body.reviewtext ? req.body.reviewtext : ""
                const ratings = req.body.ratings ? req.body.ratings : ""
                
                const reviewslist = await reviewsModel.fetchReviewsById()
                const l = reviewslist.length
                const _id = reviewslist.length == 0 ? 1 : +reviewslist[l-1]['_id'] + 1
                const input = { _id , fullname , company_id , subject , reviewtext , ratings , info : new Date().toISOString().split('T')[0] , isdeleted : 0 }
                const reviewsAddAck = reviewsModel.addReviews(input)
                return res.redirect(`/reviews/${company_id}`)
            }catch(er){
                logger.error(`Error in adding reviews`)
            }
        }
}
export default new reviewsController