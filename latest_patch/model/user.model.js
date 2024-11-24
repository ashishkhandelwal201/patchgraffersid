import "../config/database.js"
import UserSchemaModel from '../schema/user.schema.js'

// 
class UserModel{
    async loginUser({username , password}){
        const result = await UserSchemaModel.find({username , password})
        return result
    }



    async checkEmail(username){
        const result = await UserSchemaModel.find({username})
        return result
    }

    async fetchUsers(condition_obj){
        const result = await UserSchemaModel.find(condition_obj)
        return result
    }

    async insertUser(userData){
        const ackofadd = new UserSchemaModel(userData)
        console.log("ackofadd")
        console.log(ackofadd)
        ackofadd.save()
        return ackofadd
    }

}
export default new UserModel